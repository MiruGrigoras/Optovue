using Accord.Video;
using Accord.Video.FFMPEG;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace OptovueApp
{
    public partial class Form1 : Form
    {
        private ScreenRecorder _streamVideo;
        public Form1()
        {
            InitializeComponent();
            _streamVideo = new ScreenRecorder();
        }
        private void Optomo_Load(object sender, EventArgs e)
        {

        }       

        private void button1_Click(object sender, EventArgs e)
        {
            try
            {
                _streamVideo.StartRec();
                tmrRec.Start();
            }
            catch (Exception exc)
            {
                MessageBox.Show(exc.Message);
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            try
            {
                _streamVideo.StopRec();
                tmrRec.Stop();
                MessageBox.Show(@"File saved!");
                Application.Restart();
            }
            catch (Exception exc)
            {
                MessageBox.Show(exc.Message);
            }
        }

        private void tmrRec_Tick_1(object sender, EventArgs e)
        {
            lb_stopWatch.Text = _streamVideo.GetElapsed();
        }

    }
}
