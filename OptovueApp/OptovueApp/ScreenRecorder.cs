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

namespace OptovueApp
{
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
                vFWriter.Open(videoRecordingName, bounds.Width, bounds.Height, 10, VideoCodec.MPEG4, 3000000);

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
