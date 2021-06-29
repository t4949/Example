import { Component, OnInit, Injector } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ProxyService } from '../proxy.service';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  public dialogRef = null;
  public dialogData;
  constructor(public dialog: MatDialog,private injector: Injector,private proxy: ProxyService) {
    this.dialogRef = this.injector.get(MatDialogRef, null);
    this.dialogData = this.injector.get(MAT_DIALOG_DATA, null);
   }
bool
  ngOnInit() {
  }
  delete(){
    if(this.dialogData.iUserId)
   { this.proxy.DeleteUser(this.dialogData.iUserId).then(res=>
      {
        this.bool=res;
        if(this.bool)
        {
          this.dialogRef.close();
                 }
        else {
        }
      }
    );}
    else if(this.dialogData.iToolId)
    { this.proxy.DeleteTool(this.dialogData.iToolId).then(res=>
      {
        this.bool=res;
        if(this.bool)
        {
          this.dialogRef.close();
        }
        else {
        }
      }
    );}
    else if(this.dialogData.sysRowID)
    { this.proxy.DeleteSysTableRow(this.dialogData.sysRowID).then(res=>
      {
        this.bool=res;
        if(this.bool)
        {
          this.dialogRef.close();
        }
        else {
        }
      }
    );}
    
  }
  closeWindow(){
    this.dialogRef.close();
  }
}
