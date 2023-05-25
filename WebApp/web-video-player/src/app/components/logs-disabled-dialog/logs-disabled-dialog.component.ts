import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-logs-disabled-dialog',
  templateUrl: './logs-disabled-dialog.component.html',
  styleUrls: ['./logs-disabled-dialog.component.css']
})
export class LogsDisabledDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LogsDisabledDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {processid: string, processName: string}
    ) {}

  cancel(){
    this.dialogRef.close({data: null});
  }

  continue(){
    this.dialogRef.close({data: this.data});
  }
}
