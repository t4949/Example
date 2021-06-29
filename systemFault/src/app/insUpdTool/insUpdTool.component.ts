import { Component, OnInit, Injector } from '@angular/core';
import { User } from '../Models/User';
import { ProxyService } from '../proxy.service';
import { Router, ActivatedRoute } from '@angular/Router';
import { constants } from '../constants';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SysTableRow } from '../Models/SysTableRow';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Tool } from '../Models/Tool';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-insUpdTool',
  templateUrl: './insUpdTool.component.html',
  styleUrls: ['./insUpdTool.component.css'],
  providers: [DatePipe]
})
export class insUpdToolComponent implements OnInit {
      // nvToolName: '',iNumFault:'', dcreateDate: '', nvCompanyName: '',
    // nvKindToolName: '', nvDepartmentName: '', nvRoomName: '', nvFloorName: ''
  constants: any = constants;
  Tool: Tool;
  data: any;
  roomName: any;
  floorName: any;
  department: any;
  Company:any;
  KindTool:any;
  listRoomRow: SysTableRow[];
  listFloorRow: SysTableRow[];
  listDepartmentRow: SysTableRow[];
  listCompanyRow: SysTableRow[];
  listKindToolRow: SysTableRow[];
  listRooms: any[] = [];
  listFloors: any[] = [];
  listDepartment: any[] = [];
  listCompany: any[] = [];
  listKindTool: any[] = [];
  filteredRoomOptions: Observable<SysTableRow[]>;
  filteredDepartmentOptions: Observable<SysTableRow[]>;
  filteredFloorOptions: Observable<SysTableRow[]>;
  filteredCompanyOptions: Observable<SysTableRow[]>;
  filteredKindToolOptions: Observable<SysTableRow[]>;
  roomsControl: FormControl;
  floorsControl: FormControl;
  departmentControl: FormControl;
  CompanyControl: FormControl;
  KindToolControl: FormControl;
  dataIsReady:boolean = false;
  public dialogRef = null;
  public isEdit;
  public dialogData;
  constructor(private proxy: ProxyService, private router: Router, public dialog: MatDialog, private injector: Injector, private route: ActivatedRoute,private datePipe: DatePipe) {
    this.dialogRef = this.injector.get(MatDialogRef, null);
    this.dialogData = this.injector.get(MAT_DIALOG_DATA, null);
    route.params.subscribe(val => {
      this.roomsControl = new FormControl();
      this.floorsControl = new FormControl();
      this.departmentControl = new FormControl();
      this.KindToolControl = new FormControl();
      this.CompanyControl = new FormControl();
         // put the code from `ngOnInit` here
      // this.getListsValues();
      this.Tool = new Tool();
      this.route.params.subscribe(params => {
        this.isEdit = params['isEdit'];
      });
            if (this.dialogData) {
                this.proxy.GetTool(this.dialogData.toolId).then(res => {
                    res.dcreateDate=new Date(res.dcreateDate)
                    this.Tool = res;
                    this.getListsValues();
                  this.dataIsReady=true;
      });
                 
      
      
      }
      else if (this.isEdit == 'false') {
        this.Tool = new Tool();
        this.getListsValues();
      }
    });
  }
  ngOnInit() {
    this.Tool.dcreateDate=new Date();
     }
  getListsValues() {
    this.getRooms();
    this.getFloors();
    this.getDepartments();
    this.getKindTool();
    this.getCompany();
  } 
  // setDefultValues() {
    // this.roomName = this.listRoles.filter(rule => rule.iSysTableRowId == this.User.iRoleId)[0].nvSysTableRowName;
    // this.roomsControl.setValue({ nvSysTableRowName: this.User.nvRoomName });
    // this.floorsControl.setValue({ nvSysTableRowName: this.User.nvFloorName });
    // this.departmentControl.setValue({ nvSysTableRowName: this.User.nvDepartmentName});
    // this.rolesControl.setValue({ nvSysTableRowName: this.roomName});
     // }
  displayRoomFn(room?: SysTableRow): string | undefined {
    console.log();
    return room ? room.nvSysTableRowName : undefined;
  }
  displayFloorFn(floor?: SysTableRow): string | undefined {
    console.log();
    return floor ? floor.nvSysTableRowName : undefined;
  }
  displayDepartmentFn(department?: SysTableRow): string | undefined {
    console.log();
    return department ? department.nvSysTableRowName : undefined;
  }
  displayKindToolFn(role?: SysTableRow): string | undefined {
    console.log();
    return role ? role.nvSysTableRowName : undefined;
  }
  displayCompanyFn(role?: SysTableRow): string | undefined {
    console.log();
    return role ? role.nvSysTableRowName : undefined;
  }
  onSelectionChanged(value: any, id: number) {
    console.log(value.iSysTableRowId);
    switch (id) {
      case 1:
        this.Tool.iRoom = value.iSysTableRowId;
        break;
      case 2:
        this.Tool.iFloor = value.iSysTableRowId;
        break;
      case 3:
        this.Tool.iDepartment = value.iSysTableRowId;
        break;
      case 4:
        this.Tool.iCompany = value.iSysTableRowId;
        break;
        case 5:
        this.Tool.iKindToolId = value.iSysTableRowId;
        break;
    }
  }
  getRooms() {
    {
      this.listRooms = [];
      // this.Pniot.iTool=option.iToolId;
      // console.log(option.iToolId);
      this.proxy.GetSysTableRow(constants.ROOMS).then(res => {
        this.listRoomRow = res;
        if (this.listRoomRow) {
          this.listRoomRow.forEach(element => {
            let tmp = {
              iSysTableRowId: element.iSysTableRowId,
              nvSysTableRowName: element.nvSysTableRowName,
            }
            this.listRooms.push(tmp);
          });
          this.setRoomList()
          if(this.dialogData||(this.isEdit == 'true'))
           this.roomsControl.setValue({ nvSysTableRowName: this.Tool.nvRoomName });
          // this.roomName = this.listRooms.filter(iroom => iroom.iSysTableRowId == this.User.iRoom)[0].nvSysTableRowName;
          // this.roomsControl.setValue({ nvSysTableRowName: this.roomName });
          console.log(this.listRooms);
        }
        else {
        //   alert("אין משתמשים מתאימים להרשאה")
        }
      }
      );
    }
  }
  getFloors() {
    {
      this.listFloors = [];
      // this.Pniot.iTool=option.iToolId;
      // console.log(option.iToolId);
      this.proxy.GetSysTableRow(constants.FLOOR).then(res => {
        this.listFloorRow = res;
        if (this.listFloorRow) {
          this.listFloorRow.forEach(element => {
            let tmp = {
              iSysTableRowId: element.iSysTableRowId,
              nvSysTableRowName: element.nvSysTableRowName,
            }
            this.listFloors.push(tmp);
          });
          this.setFloorList()
          if(this.dialogData||(this.isEdit == 'true'))
          this.floorsControl.setValue({ nvSysTableRowName: this.Tool.nvFloorName });
        }
        else {
          alert("אין משתמשים מתאימים להרשאה")
        }
      }
      );
    }
  }
  getDepartments() {
    {
      this.listDepartment = [];
      // this.Pniot.iTool=option.iToolId;
      // console.log(option.iToolId);
      this.proxy.GetSysTableRow(constants.DEPARTMENT).then(res => {
        this.listDepartmentRow = res;
        if (this.listDepartmentRow) {
          this.listDepartmentRow.forEach(element => {
            let tmp = {
              iSysTableRowId: element.iSysTableRowId,
              nvSysTableRowName: element.nvSysTableRowName,
            }
            this.listDepartment.push(tmp);
          });
          this.setDepartmentList()
          if(this.dialogData||(this.isEdit == 'true'))
          {this.departmentControl.setValue({ nvSysTableRowName: this.Tool.nvDepartmentName});}
        }
        else {
          alert("אין משתמשים מתאימים להרשאה")
        }
      }
      );
    }
  }
  getCompany() {
    {
      this.listCompany = [];
      // this.Pniot.iTool=option.iToolId;
      // console.log(option.iToolId);
      this.proxy.GetSysTableRow(constants.COMPANY).then(res => {
        this.listCompanyRow = res;
        if (this.listCompanyRow) {
          this.listCompanyRow.forEach(element => {
            let tmp = {
              iSysTableRowId: element.iSysTableRowId,
              nvSysTableRowName: element.nvSysTableRowName,
            }
            this.listCompany.push(tmp);
          });
          this.setCompanyList()
          if(this.dialogData||(this.isEdit == 'true'))
         { this.Company = this.listCompany.filter(rule => rule.iSysTableRowId == this.Tool.iCompany)[0].nvSysTableRowName;
          this.CompanyControl.setValue({ nvSysTableRowName: this.Company});}
        }
        else {
         
        }
      }
      );
    }
  }
  getKindTool() {
    {
      this.listKindTool = [];
      // this.Pniot.iTool=option.iToolId;
      // console.log(option.iToolId);
      this.proxy.GetSysTableRow(constants.KINDTOOL).then(res => {
        this.listKindToolRow = res;
        if (this.listKindToolRow) {
          this.listKindToolRow.forEach(element => {
            let tmp = {
              iSysTableRowId: element.iSysTableRowId,
              nvSysTableRowName: element.nvSysTableRowName,
            }
            this.listKindTool.push(tmp);
          });
          this.setKindToolList()
          if(this.dialogData||(this.isEdit == 'true'))
         { this.KindTool = this.listKindTool.filter(rule => rule.iSysTableRowId == this.Tool.iKindToolId)[0].nvSysTableRowName;
          this.KindToolControl.setValue({ nvSysTableRowName: this.KindTool});}
        }
        else {
         
        }
      }
      );
    }
  }
  setRoomList() {
    this.filteredRoomOptions = this.roomsControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nvSysTableRowName),
        map(name => name ? this.roomFaultsFilter(name) : this.listRooms.slice())
      );
  }
  setFloorList() {
    this.filteredFloorOptions = this.floorsControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nvSysTableRowName),
        map(name => name ? this.floorFilter(name) : this.listFloors.slice())
      );
  }
  setDepartmentList() {
    this.filteredDepartmentOptions = this.departmentControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nvSysTableRowName),
        map(name => name ? this.departmentFilter(name) : this.listDepartment.slice())
      );
  }
  setKindToolList() {
    this.filteredKindToolOptions = this.KindToolControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nvSysTableRowName),
        map(name => name ? this.KindToolFilter(name) : this.listKindTool.slice())
      );
  }
  setCompanyList() {
    this.filteredCompanyOptions = this.CompanyControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nvSysTableRowName),
        map(name => name ? this.CompanyFilter(name) : this.listCompany.slice())
      );
  }
  private roomFaultsFilter(name: string): any[] {
    const filterFaultValue = name.toLowerCase();
    return this.listRooms.filter(option => option.nvSysTableRowName.toLowerCase().indexOf(filterFaultValue) === 0);
  }
  private floorFilter(name: string): any[] {
    const filterFaultValue = name.toLowerCase();
    return this.listFloors.filter(option => option.nvSysTableRowName.toLowerCase().indexOf(filterFaultValue) === 0);
  }
  private departmentFilter(name: string): any[] {
    const filterFaultValue = name.toLowerCase();
    return this.listDepartment.filter(option => option.nvSysTableRowName.toLowerCase().indexOf(filterFaultValue) === 0);
  }
  private CompanyFilter(name: string): any[] {
    const filterFaultValue = name.toLowerCase();
    return this.listCompany.filter(option => option.nvSysTableRowName.toLowerCase().indexOf(filterFaultValue) === 0);
  }
  private KindToolFilter(name: string): any[] {
    const filterFaultValue = name.toLowerCase();
    return this.listKindTool.filter(option => option.nvSysTableRowName.toLowerCase().indexOf(filterFaultValue) === 0);
  }
  SaveTool() {
       this.Tool.dcreateDate=this.datePipe.transform(new Date( this.Tool.dcreateDate), "yyyy/MM/dd hh:mm:ss").toString();
    this.proxy.saveTool(this.Tool).then(res => {
      this.closeWindow();
    });
  }
  
  closeWindow(){
    this.dialogRef.close();
  }

}
