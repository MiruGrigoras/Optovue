using System;
using System.Runtime.InteropServices;
using System.Windows.Forms;

namespace OptovueApp
{
    internal static class NativeMethods
    {
        [DllImport("user32.dll")]
        public static extern bool SetProcessDPIAware();
    }
    internal static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main(string[] args)
        {
            // ***this line is added for scaling the screen according to the windows settings***
            if (Environment.OSVersion.Version.Major >= 6)
                NativeMethods.SetProcessDPIAware();

            if (args.Length == 0)
            {
                // run as windows app
                Application.EnableVisualStyles();
                Application.SetCompatibleTextRenderingDefault(false);
                Application.Run(new Form1());
            }
            else
            {
                // run as console app
                ScreenRecorder rec = new ScreenRecorder();
                try
                {
                    rec.StartRec();
                }
                catch (Exception exc)
                {
                    MessageBox.Show(exc.Message);
                }

                Console.WriteLine("Press any key to stop recording");
                Console.ReadKey();

                try
                {
                    rec.StopRec();
                }
                catch (Exception exc)
                {
                    MessageBox.Show(exc.Message);
                }
            }
        }
    }
}


