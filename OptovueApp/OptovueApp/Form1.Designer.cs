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
            this.lblTime = new System.Windows.Forms.Label();
            this.selectFolderButton = new OptovueApp.CustomComponents.CustomButton();
            this.stopButton = new OptovueApp.CustomComponents.CustomButton();
            this.startButton = new OptovueApp.CustomComponents.CustomButton();
            this.SuspendLayout();
            // 
            // tmrRec
            // 
            this.tmrRec.Tick += new System.EventHandler(this.timer1_Tick);
            // 
            // lblTime
            // 
            this.lblTime.AutoSize = true;
            this.lblTime.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblTime.Location = new System.Drawing.Point(348, 323);
            this.lblTime.Name = "lblTime";
            this.lblTime.Size = new System.Drawing.Size(90, 25);
            this.lblTime.TabIndex = 6;
            this.lblTime.Text = "00:00:00";
            this.lblTime.Click += new System.EventHandler(this.label1_Click);
            // 
            // selectFolderButton
            // 
            this.selectFolderButton.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(30)))), ((int)(((byte)(73)))), ((int)(((byte)(226)))));
            this.selectFolderButton.BackgroundColor = System.Drawing.Color.FromArgb(((int)(((byte)(30)))), ((int)(((byte)(73)))), ((int)(((byte)(226)))));
            this.selectFolderButton.BorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(30)))), ((int)(((byte)(73)))), ((int)(((byte)(226)))));
            this.selectFolderButton.BorderRadius = 7;
            this.selectFolderButton.BorderSize = 0;
            this.selectFolderButton.FlatAppearance.BorderSize = 0;
            this.selectFolderButton.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.selectFolderButton.ForeColor = System.Drawing.Color.White;
            this.selectFolderButton.Location = new System.Drawing.Point(321, 251);
            this.selectFolderButton.Name = "selectFolderButton";
            this.selectFolderButton.Size = new System.Drawing.Size(150, 40);
            this.selectFolderButton.TabIndex = 5;
            this.selectFolderButton.Text = "Select Folder";
            this.selectFolderButton.TextColor = System.Drawing.Color.White;
            this.selectFolderButton.UseVisualStyleBackColor = false;
            this.selectFolderButton.Click += new System.EventHandler(this.button3_Click);
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
            this.stopButton.Location = new System.Drawing.Point(321, 178);
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
            this.startButton.Location = new System.Drawing.Point(321, 101);
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
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.lblTime);
            this.Controls.Add(this.selectFolderButton);
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
        private CustomComponents.CustomButton selectFolderButton;
        private System.Windows.Forms.Timer tmrRec;
        private System.Windows.Forms.Label lblTime;
    }
}

