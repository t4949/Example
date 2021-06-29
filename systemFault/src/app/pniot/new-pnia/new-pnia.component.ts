import { Component, OnInit, Input, NgZone, ViewChild, Injector } from '@angular/core';
import { User } from 'src/app/Models/User';
import { SelectItem } from 'primeng/api';
import { ProxyService } from 'src/app/proxy.service';
import { Router } from '@angular/Router';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Tool } from 'src/app/Models/Tool';
import { Pniot } from 'src/app/Models/Pniot';
import { constants } from '../../constants';
import { SysTableRow } from 'src/app/Models/SysTableRow';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { promise } from 'protractor';
import { NbDateService } from '@nebular/theme';
import { QuickSupprtComponent } from 'src/app/quick-supprt/quick-supprt.component';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-new-pnia',
  templateUrl: './new-pnia.component.html',
  styleUrls: ['./new-pnia.component.css']
})

export class NewPniaComponent implements OnInit {
  today: Date = new Date();
  constants: any = constants;
  iToolId: number;
  iFaultId: number
  Pniot: Pniot;
  Users: User[];
  ToolFaults: SysTableRow[];
  statues: SysTableRow[];
  listUsers: any[] = [];
  listStatues: any[] = [];
  listToolFaults: any[] = [];
  selectUser: any;
  // listTools: any[] = [{ value: '1', viewValue: 'מחשב' }, { value: '2', viewValue: 'מדפסת' }];
  toolsControl = new FormControl('', [Validators.required]);
  faultsControl = new FormControl('', [Validators.required]);
  usersControl = new FormControl('', [Validators.required]);
  statuesControl = new FormControl('', [Validators.required]);
  // dPniaDateControl = new FormControl();
  // email = new FormControl('', [Validators.required, Validators.email]);
  options: any[] = [];
  filteredOptions: Observable<SysTableRow[]>;
  // filteredToolFaultOptions: Observable<SysTableRow[]>;
  filterUsers: Observable<User[]>;
  filterStatues: Observable<SysTableRow[]>;
  selectedUser: string;
  selectedTool: string;
  selectFault: string;
  pone: any;
  user: User;
  description: string;
   data: any;
  public dialogRef = null;
  public dialogData;
  constructor(private proxy: ProxyService, private router: Router, public dialog: MatDialog, private injector: Injector, private datePipe: DatePipe,private zone:NgZone) {
    this.dialogRef = this.injector.get(MatDialogRef, null);
    this.dialogData = this.injector.get(MAT_DIALOG_DATA, null);
    this.Pniot = new Pniot();
  }
  ngOnInit() {
    // this.dPniaDateControl.patchValue(this.date);
    // this.Pniot.dPniaDate=new Date();
    // this.Pniot.dPniaDate=new Date(this.datePipe.transform(new Date(this.date), "dd MMM yyyy hh:mm:ss"));
    // 12/12/2005 0:00:00
    this.Pniot.dPniaDate=new Date();
    if (this.dialogData) {
      
    this.Pniot = this.dialogData.pnia;
    this.Pniot.dPniaDate=new Date(this.Pniot.dPniaDate);
    }
    this.GetToolsList();
    this.GetUsers();
    this.GetStatues();
  }
  displayFn(tool?: SysTableRow): string | undefined {
    return tool ? tool.nvSysTableRowName : undefined;
  }
  displayToolFaultFn(ToolFaults?: SysTableRow): string | undefined {
       return ToolFaults ? ToolFaults.nvSysTableRowName : undefined;
  }
  displayUserFn(user?: any): string | undefined {
    return user ? user.viewValue : undefined;
  }
  displayStatuesFn(SysTableRow?: SysTableRow): string | undefined {
    return SysTableRow ? SysTableRow.nvSysTableRowName : undefined;
  }
  private _filter(name: string): SysTableRow[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.nvSysTableRowName.toLowerCase().indexOf(filterValue) === 0);
  }
  private filterUser(name: string): User[] {
    const filterValue = name.toLowerCase();
    return this.listUsers.filter(option => option.viewValue.toLowerCase().indexOf(filterValue) === 0);
  }
  private filterStatue(name: string): User[] {
    const filterValue = name.toLowerCase();
    return this.listStatues.filter(option => option.viewValue.toLowerCase().indexOf(filterValue) === 0);
  }
  
  ngAfterViewInit() {
       this.faultsControl.patchValue([2]);
  }
  setToolsList() {
    this.filteredOptions = this.toolsControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nvSysTableRowName),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  
  setStatuesList() {
    this.filterStatues = this.statuesControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.viewValue),
        map(name => name ? this.filterStatue(name) : this.listStatues.slice())
      );
  }
  setUsersList() {
    this.filterUsers = this.usersControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.viewValue),
        map(name => name ? this.filterUser(name) : this.listUsers.slice())
      );
  }
  // fixTimeZone(date: Date) {
  //   // UTC
  //   var userTimezoneOffset = date.getTimezoneOffset() * 60000;
  //   this.Pniot.dPniaDate = new Date(date.getTime() - userTimezoneOffset)
  // }
  

  GetStatues() {
    {
      this.listStatues = [];
      this.proxy.GetSysTableRow(constants.STATUES).then(res => {
        this.statues = res;
        if (this.statues) {
         this.listStatues = this.statues;
          this.setStatuesList();
          if (this.dialogData)
                       this.statuesControl.setValue({ nvSysTableRowName: this.Pniot.nvStatusName });
         
        }
        else {
          alert("אין משתמשים מתאימים להרשאה")
        }
      }
      );
    }
  }
  GetToolsList() {
    this.options = [];
    this.proxy.GetToolsList().then(res => {
      this.data = res;
      if (this.data) {
         this.options = this.data;
        this.setToolsList();
        if (this.dialogData)
          this.toolsControl.setValue({ nvSysTableRowName: this.Pniot.nvToolName });
            }
      else {
        alert("אין משתמשים מתאימים להרשאה")
      }
    }
    );
  }
  GetUsers() {
    this.proxy.GetUsers().then(res => {
      this.Users = res;
      if (this.Users) {
        this.Users.forEach(element => {
          let tmp = {
            value: element.iUserId,
            viewValue: element.nvFirstName + ' ' + element.nvLastName
          }
          this.listUsers.push(tmp);
        });

        this.setUsersList();
        if (this.dialogData) {
        this.usersControl.setValue({ viewValue: this.Pniot.nvMetapelName });
           }
        console.log(this.Users);
      }
      else {
        alert("אין משתמשים מתאימים להרשאה")
      }
    }
    );
  }
  AddPnia() {
    this.Pniot.dPniaDate=this.datePipe.transform(new Date(this.Pniot.dPniaDate), "yyyy/MM/dd hh:mm:ss").toString();
     this.proxy.AddPnia(this.Pniot).then(res => {
       this.Users = res;
      if (this.Users&&this.dialogData) {
              this.closeWindow();
      }
      else {
      }
    }
    );
    this.Pniot.dPniaDate=new Date();
  }
    closeWindow() {
     this.proxy.pniotUpdated.emit();
     this.zone.run(() => {
    });
    this.dialogRef.close();
  }
  onSelectionChanged(value: any, id: number) {
        switch (id) {
           case 1:
       this.Pniot.iUserId = value.value;
       break;
       case 3:
       this.Pniot.iToolId = value.iSysTableRowId;
       break;
        case 4:
       this.Pniot.iStatuesId = value.iSysTableRowId;
     break;
    }
  }
 
}
