import { Component, OnInit ,Inject,ViewContainerRef, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProxyService } from 'src/app/proxy.service';
import { TaalichPnia } from 'src/app/Models/TaalichPnia';
import { Editor } from 'primeng/editor';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-taalich',
  templateUrl: './taalich.component.html',
  styleUrls: ['./taalich.component.css']
})

export class TaalichComponent implements OnInit {
 
 taalichPnia:TaalichPnia[];
 lastTaalichPnia:TaalichPnia;
  constructor(public proxy: ProxyService,public dialogRef: MatDialogRef<TaalichComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.taalichPnia=new Array;
    this.lastTaalichPnia=new TaalichPnia();
  }
  ngOnInit() {
   console.log(this.data.pniaId);
    this.proxy.GetTaalichPnia(this.data.pniaId).then(res => {
      this.taalichPnia = res;
      this.taalichPnia.forEach(element => {
        if(element.TaalichPniaDate!=null || element.TaalichPniaDate !=undefined)
        {
        let dt= new Date(element.TaalichPniaDate.match(/\d+/)[0] * 1)
        element.TaalichPniaDate=dt.toLocaleDateString();
        }
      });
      this.data.pniaSubject
        }
    );
    
    
  }
  saveTaalichPnia(){
    this.proxy.saveTaalichPnia(this.data.pniaId,this.proxy.User.iUserId,this.lastTaalichPnia.nvTaalichPniaContent).then(res => {
      if(res==true)
      {
          this.proxy.GetTaalichPnia(this.data.pniaId).then(res => {
          this.taalichPnia = res;
          this.taalichPnia.forEach(element => {
            if(element.TaalichPniaDate!=null || element.TaalichPniaDate !=undefined)
            {
            let dt= new Date(element.TaalichPniaDate.match(/\d+/)[0] * 1)
            element.TaalichPniaDate=dt.toLocaleDateString();
            }
          });
          this.lastTaalichPnia=new TaalichPnia();
            }
        );
      }
        else{
        
        }
      }
    );
      
  
  }
  movePniaToHistory(){
    this.proxy.movePniaToHistory(this.data.pniaId).then(res => {
      if(res==true)
      {
                this.dialogRef.close();
      }
        else{
                }
      }
    );
      
  
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
