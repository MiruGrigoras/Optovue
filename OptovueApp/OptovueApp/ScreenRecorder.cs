using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;

using Accord.Video.FFMPEG;
using System.Runtime.InteropServices;

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

    class ScreenRecorder
    {
        //Video variables
        private Rectangle bounds;

        private string TempBasePath => Path.Combine(Path.GetTempPath(), "optovue");
        private string VideoFolderPath => Path.Combine(TempBasePath, "video");
        private string FramesFolderPath => Path.Combine(TempBasePath, "frames");

        private int fileCount = 1; //unique identifier for screenshots
        private readonly List<string> VideoFrames = new List<string>();

        //Time variable
        Stopwatch watch = new Stopwatch();

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

        public ScreenRecorder(Rectangle screenBounds)
        { 
            Directory.CreateDirectory(TempBasePath);
            Directory.CreateDirectory(VideoFolderPath);
            Directory.CreateDirectory(FramesFolderPath);

            bounds = screenBounds;
        }

        public string GetElapsed()
        {
            return string.Format("{0:D2}:{1:D2}:{2:D2}", watch.Elapsed.Hours, watch.Elapsed.Minutes, watch.Elapsed.Seconds);
        }

        public void Start()
        {
            //Keep track of time:
            watch.Start();
        }

        public void CaptureFrame()
        {
            using (var bitmap = new Bitmap(bounds.Width, bounds.Height))
            using (var graphics = Graphics.FromImage(bitmap))
            {
                //Add screen to bitmap:
                graphics.CopyFromScreen(new Point(bounds.Left, bounds.Top), Point.Empty, bounds.Size);

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
        }

        private void SaveFrame(Image bitmap)
        {
            string filePath = FramesFolderPath + "\\" + fileCount + ".png";
            bitmap.Save(filePath, ImageFormat.Png);
            VideoFrames.Add(filePath);
            fileCount++;
        }

        private void ProduceVideoOfFrames()
        {
            string videoRecordingName = string.Format(@"{0}\{1}_{2}.mp4", VideoFolderPath, Environment.UserName.ToUpper(), DateTime.Now.ToString("d_MMM_yyyy_HH_mm_ssff"));
            using (var vFWriter = new VideoFileWriter())
            {
                vFWriter.Open(videoRecordingName, bounds.Width, bounds.Height, 10, VideoCodec.MPEG4, 6000000);

                foreach (var frame in VideoFrames)
                {
                    Bitmap imageFrame = Image.FromFile(frame) as Bitmap;
                    vFWriter.WriteVideoFrame(imageFrame);
                    imageFrame.Dispose();
                }

                vFWriter.Close();
            }

        }

        public void Stop()
        {
            watch.Stop();

            ProduceVideoOfFrames();
            DirectoryUtil.DeletePathRecursive(FramesFolderPath);
        }

    }
}
