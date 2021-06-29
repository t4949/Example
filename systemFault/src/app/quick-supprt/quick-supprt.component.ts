import { Component, OnInit, Injector } from '@angular/core';
import { ProxyService } from '../proxy.service';
import { FormControl, Validators } from '@angular/forms';
import { SysTableRow } from '../Models/SysTableRow';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { constants } from '../constants';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-quick-supprt',
  templateUrl: './quick-supprt.component.html',
  styleUrls: ['./quick-supprt.component.css']
})
export class QuickSupprtComponent implements OnInit {
  public dialogRef = null;
  // public dialogData;
  constructor(public dialog: MatDialog ,private injector: Injector,private proxy:ProxyService) {
    this.dialogRef = this.injector.get(MatDialogRef, null);
    // this.dialogData = this.injector.get(MAT_DIALOG_DATA, null);
   }
  iFaultId:any;
  listToolFaults: any[] = [];
  listSupport: any[] = [];
  faultsControl = new FormControl('', [Validators.required]);
  ToolFaults: SysTableRow[];
  support: SysTableRow[];
  filteredToolFaultOptions: Observable<SysTableRow[]>;
  ngOnInit() {
    this.GetFaults();
  }
  private ToolFaultsFilter(name: string): any[] {
    const filterFaultValue = name.toLowerCase();
    return this.listToolFaults.filter(option => option.nvSysTableRowName.toLowerCase().indexOf(filterFaultValue) === 0);
  }
  setToolFaultsList() {
    this.filteredToolFaultOptions = this.faultsControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nvSysTableRowName),
        map(name => name ? this.ToolFaultsFilter(name) : this.listToolFaults.slice())
      );
  }
  displayToolFaultFn(ToolFaults?: SysTableRow): string | undefined {
    console.log();
    return ToolFaults ? ToolFaults.nvSysTableRowName : undefined;
  }
  onSelectionChanged(value: any) {
     this.iFaultId = value.iSysTableRowId;
     console.log(this.iFaultId)  
     this.GetSupport();   

  }
  GetFaults() {
    {
      this.listToolFaults = [];
           this.proxy.GetSysTableRow(constants.FAULT).then(res => {
        this.ToolFaults = res;
        if (this.ToolFaults) {
          // this.ToolFaults.forEach(element => {
          //   let tmp = {
          //     iSysTableRowId: element.iSysTableRowId,
          //     nvSysTableRowName: element.nvSysTableRowName,
          //   }
          //   this.listToolFaults.push(tmp);
          // });
          this.listToolFaults=this.ToolFaults;
                  this.setToolFaultsList()
        
          //  {this.selectFault = this.listToolFaults.filter(fault =>fault.iSysTableRowId == this.Pniot.iFaultId)[0].nvSysTableRowName;
          
          console.log(this.listToolFaults);
        }
        else {
          alert("אין משתמשים מתאימים להרשאה")
        }
      }
      );
    }
  }
  GetSupport() {
    {
      this.listToolFaults = [];
      
           this.proxy.GetSysTableRow(this.iFaultId).then(res => {
        this.support = res;
        if (this.support) {
          // this.ToolFaults.forEach(element => {
          //   let tmp = {
          //     iSysTableRowId: element.iSysTableRowId,
          //     nvSysTableRowName: element.nvSysTableRowName,
          //   }
          //   this.listToolFaults.push(tmp);
          // });
          this.listSupport=this.support;
                  this.setToolFaultsList()
        
          //  {this.selectFault = this.listToolFaults.filter(fault =>fault.iSysTableRowId == this.Pniot.iFaultId)[0].nvSysTableRowName;
          
          console.log(this.listToolFaults);
        }
        else {
          alert("אין משתמשים מתאימים להרשאה")
        }
      }
      );
    }
  }

}
