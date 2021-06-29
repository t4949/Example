import { Component, OnInit, Injector } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ProxyService } from '../proxy.service';
import { SysTableRow } from '../Models/SysTableRow';

@Component({
  selector: 'app-ins-upd-sys-row',
  templateUrl: './ins-upd-sys-row.component.html',
  styleUrls: ['./ins-upd-sys-row.component.css']
})
export class InsUpdSysRowComponent implements OnInit {
  public sysRow:SysTableRow;
  public dialogRef = null;
  public dialogData;
  constructor(public dialog: MatDialog,private injector: Injector,private proxy: ProxyService) {
       this.dialogRef = this.injector.get(MatDialogRef, null);
    this.dialogData = this.injector.get(MAT_DIALOG_DATA, null);
      }
bool;
  ngOnInit() {
    if(this.dialogData)  //edit
    {
      this.sysRow=this.dialogData.sysRow;
    }
    else//new value
   { this.sysRow=new SysTableRow();}
  }
  AddNew(){
    //delete this and insert new 
    this.proxy.SaveSysTableRow(this.sysRow.iSysTableRowId,this.sysRow.nvSysTableRowName,this.dialogData.tableId).then(res=>
      {
        this.bool=res;
        if(this.bool)
        {
          this.dialogRef.close();
                 }
        else {
        }
      }
    );
  }
  closeWindow(){
    this.dialogRef.close();
  }
}

