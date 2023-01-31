using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace OptovueApp
{
    public partial class Form1 : Form
    {
        ScreenRecorder screenRecorder = new ScreenRecorder(new Rectangle());
        public Form1()
        {
            InitializeComponent();
        }
        private void Optomo_Load(object sender, EventArgs e)
        {

        }       

        private void button1_Click(object sender, EventArgs e)
        {
            Rectangle bounds = Screen.FromControl(this).Bounds;
            screenRecorder = new ScreenRecorder(bounds);
            tmrRec.Start();
            screenRecorder.Start();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            screenRecorder.Stop();
            tmrRec.Stop();
            Application.Restart();
        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            screenRecorder.CaptureFrame();
            lblTime.Text = screenRecorder.GetElapsed();
        }

        private void label1_Click(object sender, EventArgs e)
        {

        }
    }
}
