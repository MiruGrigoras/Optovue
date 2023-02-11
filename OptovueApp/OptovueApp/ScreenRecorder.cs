using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;

using Accord.Video.FFMPEG;
using System.Runtime.InteropServices;
using System.Threading;
using Accord.Video;
using System.Windows.Forms;

namespace OptovueApp
{
    public static class User32
    {
        public const Int32 CURSOR_SHOWING = 0x00000001;

        [StructLayout(LayoutKind.Sequential)]
        public struct ICONINFO
        {
            public bool fIcon;
            public Int32 xHotspot;
            public Int32 yHotspot;
            public IntPtr hbmMask;
            public IntPtr hbmColor;
        }

        [StructLayout(LayoutKind.Sequential)]
        public struct POINT
        {
            public Int32 x;
            public Int32 y;
        }

        [StructLayout(LayoutKind.Sequential)]
        public struct CURSORINFO
        {
            public Int32 cbSize;
            public Int32 flags;
            public IntPtr hCursor;
            public POINT ptScreenPos;
        }

        [DllImport("user32.dll")]
        public static extern bool GetCursorInfo(out CURSORINFO pci);

        [DllImport("user32.dll")]
        public static extern IntPtr CopyIcon(IntPtr hIcon);

        [DllImport("user32.dll")]
        public static extern bool DrawIcon(IntPtr hdc, int x, int y, IntPtr hIcon);

        [DllImport("user32.dll")]
        public static extern bool GetIconInfo(IntPtr hIcon, out ICONINFO piconinfo);
    }

    public static class DirectoryUtil
    {
        public static void DeletePathRecursive(string targetDirectory)
        {
            string[] files = Directory.GetFiles(targetDirectory);
            string[] dirs = Directory.GetDirectories(targetDirectory);

            //Delete each screenshot:
            foreach (string file in files)
            {
                File.SetAttributes(file, FileAttributes.Normal);
                File.Delete(file);
            }

            //Delete the path:
            foreach (string dir in dirs)
            {
                DeletePathRecursive(dir);
            }

            Directory.Delete(targetDirectory, false);
        }
    }

    class ScreenRecorder
    {
        private readonly int _bitRate;
        private readonly int _frameRate;
        private readonly int _frameInterval;
        private UInt32 _frameCount;
        private Rectangle _screenArea;

        private bool _isRecording;
        private VideoFileWriter _writer;
        private readonly Stopwatch _stopWatch;
        private readonly List<string> VideoFrames = new List<string>();

        private Thread thread;
        private ManualResetEvent stopEvent;
        public event NewFrameEventHandler NewFrame;
        public event PlayingFinishedEventHandler PlayingFinished;
        public event VideoSourceErrorEventHandler VideoSourceError;

        public virtual string Source => "Screen Recorder";
        private string TempBasePath => Path.Combine(Path.GetTempPath(), "optovue");
        private string VideoFolderPath => Path.Combine(TempBasePath, "video");
        private string FramesFolderPath => Path.Combine(TempBasePath, "frames");

        private bool IsRecording
        {
            get
            {
                return _isRecording;
            }
            set
            {
                _isRecording = value;
            }

        }
        public bool IsRunning
        {
            get
            {
                if (thread != null)
                {
                    if (!thread.Join(0))
                    {
                        return true;
                    }

                    Free();
                }

                return false;
            }
        }

        public ScreenRecorder()
        {
            _bitRate = 30000000;
            _frameRate = 10;
            _frameInterval = 100;

            _screenArea = Screen.PrimaryScreen.Bounds;
            _writer = new VideoFileWriter();
            _stopWatch = new Stopwatch();

            IsRecording = false;
            NewFrame += new NewFrameEventHandler(Video_NewFrame);

            Directory.CreateDirectory(TempBasePath);
            Directory.CreateDirectory(VideoFolderPath);
            Directory.CreateDirectory(FramesFolderPath);
        }

        public ScreenRecorder(int bitRate, int frameRate, int frameInterval)
        {

            _bitRate = bitRate;
            _frameRate = frameRate;
            _frameInterval = frameInterval;

            _screenArea = Screen.PrimaryScreen.Bounds;
            _writer = new VideoFileWriter();
            _stopWatch = new Stopwatch();

            IsRecording = false;
            NewFrame += new NewFrameEventHandler(Video_NewFrame);

            Directory.CreateDirectory(TempBasePath);
            Directory.CreateDirectory(VideoFolderPath);
            Directory.CreateDirectory(FramesFolderPath);
        }

        public void StartRec()
        {
            if (IsRecording == false)
            {
                IsRecording = true;
                _frameCount = 0;

                string fullName = string.Format(@"{0}\{1}_{2}.mp4", VideoFolderPath, Environment.UserName.ToUpper(), DateTime.Now.ToString("d_MMM_yyyy_HH_mm_ssff"));

                _writer.Open(
                    fullName,
                    _screenArea.Width,
                    _screenArea.Height,
                    _frameRate, VideoCodec.MPEG4, _bitRate);

                _stopWatch.Start();

                // Start main work
                Start();
            }
        }

        public void Start()
        {
            if (!IsRunning)
            {
                stopEvent = new ManualResetEvent(initialState: false);
                thread = new Thread(WorkerThread)
                {
                    Name = Source
                };
                thread.Start();
            }
        }

        public void SignalToStop()
        {
            if (thread != null)
            {
                stopEvent.Set();
            }
        }

        public void WaitForStop()
        {
            if (thread != null)
            {
                thread.Join();
                Free();
            }
        }

        public void StopRec()
        {
            IsRecording = false;
            Stop();
            Console.WriteLine("Video was saved to:" + VideoFolderPath.ToString());
        }
        public void Stop()
        {
            if (IsRunning)
            {
                stopEvent.Set();
                thread.Abort();
                WaitForStop();
            }
        }

        private void Free()
        {
            thread = null;
            stopEvent.Close();
            stopEvent = null;
        }

        public string GetElapsed()
        {
            return string.Format("{0:D2}:{1:D2}:{2:D2}", _stopWatch.Elapsed.Hours, _stopWatch.Elapsed.Minutes, _stopWatch.Elapsed.Seconds);
        }

        private void Video_NewFrame(object sender, NewFrameEventArgs eventArgs)
        {
            if (IsRecording)
            {
                _frameCount++;
                _writer.WriteVideoFrame(eventArgs.Frame);// write frames as we go
                //SaveFrame(eventArgs.Frame); //save frame and create video later on
                Console.WriteLine("Frame time is: " + _stopWatch.Elapsed.ToString());
            }
            else
            {
                _stopWatch.Reset();
                Thread.Sleep(500);
                SignalToStop();
                Thread.Sleep(500);
                _writer.Close();
            }
        }
        private void WorkerThread()
        {
            int width = _screenArea.Width;
            int height = _screenArea.Height;
            int x = _screenArea.Location.X;
            int y = _screenArea.Location.Y;
            Size size = _screenArea.Size;
            Bitmap bitmap = new Bitmap(width, height, PixelFormat.Format32bppArgb);
            Graphics graphics = Graphics.FromImage(bitmap);
            while (!stopEvent.WaitOne(0, exitContext: false))
            {
                DateTime now = DateTime.Now;
                try
                {
                    graphics.CopyFromScreen(x, y, 0, 0, size, CopyPixelOperation.SourceCopy);

                    NewFrame?.Invoke(this, new NewFrameEventArgs(bitmap));

                    if (_frameInterval > 0)
                    {
                        TimeSpan timeSpan = DateTime.Now.Subtract(now);
                        int num = _frameInterval - (int)timeSpan.TotalMilliseconds;
                        if (num > 0 && stopEvent.WaitOne(num, exitContext: false))
                        {
                            break;
                        }
                    }
                }
                catch (ThreadAbortException)
                {
                    break;
                }
                catch (Exception ex2)
                {
                    VideoSourceError?.Invoke(this, new VideoSourceErrorEventArgs(ex2.Message));
                    Thread.Sleep(250);
                }

                if (stopEvent.WaitOne(0, exitContext: false))
                {
                    break;
                }
            }

            graphics.Dispose();
            bitmap.Dispose();
            PlayingFinished?.Invoke(this, ReasonToFinishPlaying.StoppedByUser);
        }

        //Old logic, take screenshots first and create video at the end

        /*public void Start()
        {
            //Keep track of time:
            watch.Start();
            t = new Thread(CaptureFrame);
            t.Start();
        }*/

        /*public void CaptureFrame()
        {
            using (var bitmap = new Bitmap(_screenArea.Width, _screenArea.Height))
            using (var graphics = Graphics.FromImage(bitmap))
            {
                //Add screen to bitmap:
                graphics.CopyFromScreen(new Point(_screenArea.Left, _screenArea.Top), Point.Empty, _screenArea.Size);

                User32.CURSORINFO cursorInfo;
                cursorInfo.cbSize = Marshal.SizeOf(typeof(User32.CURSORINFO));

                if (User32.GetCursorInfo(out cursorInfo))
                {
                    // if the cursor is showing draw it on the screen shot
                    if (cursorInfo.flags == User32.CURSOR_SHOWING)
                    {
                        // we need to get hotspot so we can draw the cursor in the correct position
                        var iconPointer = User32.CopyIcon(cursorInfo.hCursor);
                        User32.ICONINFO iconInfo;
                        int iconX, iconY;

                        if (User32.GetIconInfo(iconPointer, out iconInfo))
                        {
                            // calculate the correct position of the cursor
                            iconX = cursorInfo.ptScreenPos.x - ((int)iconInfo.xHotspot);
                            iconY = cursorInfo.ptScreenPos.y - ((int)iconInfo.yHotspot);

                            // draw the cursor icon on top of the captured screen image
                            User32.DrawIcon(graphics.GetHdc(), iconX, iconY, cursorInfo.hCursor);

                            // release the handle created by call to g.GetHdc()
                            graphics.ReleaseHdc();
                        }
                    }
                }

                //Save screenshot:
                SaveFrame(bitmap);
            }
            Thread.Sleep(1000);
        }*/

        /*private void SaveFrame(Image bitmap)
        {
            string filePath = FramesFolderPath + "\\" + _frameCount + ".png";
            bitmap.Save(filePath, ImageFormat.Png);
            VideoFrames.Add(filePath);
        }*/

        /*private void ProduceVideoOfFrames()
        {
            string videoRecordingName = string.Format(@"{0}\{1}_{2}.mp4", VideoFolderPath, Environment.UserName.ToUpper(), DateTime.Now.ToString("d_MMM_yyyy_HH_mm_ssff"));
            using (var vFWriter = new VideoFileWriter())
            {
                vFWriter.Open(videoRecordingName, bounds.Width, bounds.Height, 10, VideoCodec.MPEG4, 1200 * 1000);

                foreach (var frame in VideoFrames)
                {
                    Bitmap imageFrame = Image.FromFile(frame) as Bitmap;
                    vFWriter.WriteVideoFrame(imageFrame);
                    imageFrame.Dispose();
                }

                vFWriter.Close();
            }

        }*/

        /*public void Stop()
        {
            ProduceVideoOfFrames();
            DirectoryUtil.DeletePathRecursive(FramesFolderPath);
        }*/

        ///////////////////////////////////////////////////////////////

    }
}
