namespace OptovueApp
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
            this.tmrRec = new System.Windows.Forms.Timer(this.components);
            this.lb_stopWatch = new System.Windows.Forms.Label();
            this.stopButton = new OptovueApp.CustomComponents.CustomButton();
            this.startButton = new OptovueApp.CustomComponents.CustomButton();
            this.SuspendLayout();
            // 
            // tmrRec
            // 
            this.tmrRec.Tick += new System.EventHandler(this.tmrRec_Tick_1);
            // 
            // lb_stopWatch
            // 
            this.lb_stopWatch.AutoSize = true;
            this.lb_stopWatch.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lb_stopWatch.Location = new System.Drawing.Point(105, 205);
            this.lb_stopWatch.Name = "lb_stopWatch";
            this.lb_stopWatch.Size = new System.Drawing.Size(90, 25);
            this.lb_stopWatch.TabIndex = 6;
            this.lb_stopWatch.Text = "00:00:00";
            // 
            // stopButton
            // 
            this.stopButton.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(30)))), ((int)(((byte)(73)))), ((int)(((byte)(226)))));
            this.stopButton.BackgroundColor = System.Drawing.Color.FromArgb(((int)(((byte)(30)))), ((int)(((byte)(73)))), ((int)(((byte)(226)))));
            this.stopButton.BorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(30)))), ((int)(((byte)(73)))), ((int)(((byte)(226)))));
            this.stopButton.BorderRadius = 7;
            this.stopButton.BorderSize = 0;
            this.stopButton.FlatAppearance.BorderSize = 0;
            this.stopButton.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.stopButton.ForeColor = System.Drawing.Color.White;
            this.stopButton.Location = new System.Drawing.Point(79, 138);
            this.stopButton.Name = "stopButton";
            this.stopButton.Size = new System.Drawing.Size(150, 40);
            this.stopButton.TabIndex = 4;
            this.stopButton.Text = "Stop";
            this.stopButton.TextColor = System.Drawing.Color.White;
            this.stopButton.UseVisualStyleBackColor = false;
            this.stopButton.Click += new System.EventHandler(this.button2_Click);
            // 
            // startButton
            // 
            this.startButton.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(30)))), ((int)(((byte)(73)))), ((int)(((byte)(226)))));
            this.startButton.BackgroundColor = System.Drawing.Color.FromArgb(((int)(((byte)(30)))), ((int)(((byte)(73)))), ((int)(((byte)(226)))));
            this.startButton.BorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(30)))), ((int)(((byte)(73)))), ((int)(((byte)(226)))));
            this.startButton.BorderRadius = 7;
            this.startButton.BorderSize = 0;
            this.startButton.FlatAppearance.BorderSize = 0;
            this.startButton.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.startButton.ForeColor = System.Drawing.Color.White;
            this.startButton.Location = new System.Drawing.Point(79, 55);
            this.startButton.Name = "startButton";
            this.startButton.Size = new System.Drawing.Size(150, 40);
            this.startButton.TabIndex = 3;
            this.startButton.Text = "Start";
            this.startButton.TextColor = System.Drawing.Color.White;
            this.startButton.UseVisualStyleBackColor = false;
            this.startButton.Click += new System.EventHandler(this.button1_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(310, 278);
            this.Controls.Add(this.lb_stopWatch);
            this.Controls.Add(this.stopButton);
            this.Controls.Add(this.startButton);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "Form1";
            this.Text = "Optovue";
            this.Load += new System.EventHandler(this.Optomo_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion
        private CustomComponents.CustomButton startButton;
        private CustomComponents.CustomButton stopButton;
        private System.Windows.Forms.Timer tmrRec;
        private System.Windows.Forms.Label lb_stopWatch;
    }
}

