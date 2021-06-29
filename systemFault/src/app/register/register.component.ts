import { Component, OnInit, Injector, NgZone } from '@angular/core';
import { User } from '../Models/User';
import { ProxyService } from '../proxy.service';
import { Router, ActivatedRoute } from '@angular/Router';
import { constants } from '../constants';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SysTableRow } from '../Models/SysTableRow';
import { Observable } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  emailFormControl:FormControl;
  PhoneNumber:FormControl;
  IDFormControl:FormControl;
  hide=true;
 displayUser:any=-1;
  constants: any = constants;
  User: User;
  data: any;
  roomName: any;
  floorName: any;
  department: any;
  listRoomRow: SysTableRow[];
  listFloorRow: SysTableRow[];
  listDepartmentRow: SysTableRow[];
  listRoleRow: SysTableRow[];
  listRooms: any[] = [];
  listFloors: any[] = [];
  listDepartment: any[] = [];
  listRoles: any[] = [];
  filteredRoomOptions: Observable<SysTableRow[]>;
  filteredDepartmentOptions: Observable<SysTableRow[]>;
  filteredFloorOptions: Observable<SysTableRow[]>;
  filteredRoleOptions: Observable<SysTableRow[]>;
  roomsControl: FormControl;
  floorsControl: FormControl;
  departmentControl: FormControl;
  rolesControl: FormControl;
  dataIsReady: boolean = false;
  public dialogRef = null;
  public isEdit;
  public dialogData;
  constructor(private proxy: ProxyService, private router: Router, public dialog: MatDialog, private injector: Injector, private route: ActivatedRoute) {
    this.dialogRef = this.injector.get(MatDialogRef, null);
    this.dialogData = this.injector.get(MAT_DIALOG_DATA, null);
    route.params.subscribe(val => {
      this.roomsControl = new FormControl();
      this.floorsControl = new FormControl();
      this.departmentControl = new FormControl();
      this.rolesControl = new FormControl();
      this.emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
      ]);
      this.PhoneNumber = new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]);
      this.IDFormControl = new FormControl('', [
        Validators.required,
      Validators.maxLength(9),
      Validators.minLength(9),
        Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
      ]);
      // put the code from `ngOnInit` here
      // this.getListsValues();
      this.User = new User();
      this.displayUser=-1;
      this.route.params.subscribe(params => {
        this.isEdit = params['isEdit'];
      });
      if (this.dialogData) {
        this.User = this.dialogData.user;
        this.emailFormControl.patchValue(this.User.nvEmail);
        this.PhoneNumber.patchValue(this.User.nvTel);
        this.IDFormControl.patchValue(this.User.nvID);
        // this.nvUserNameFormControl.patchValue(this.User.nvUserName)
        this.getListsValues();
        this.dataIsReady = true;


      }
      else if (this.isEdit == 'true') {
        this.displayUser=1;
        this.proxy.GetUser(this.proxy.User.iUserId).then(res => {
          this.User = res;
          this.emailFormControl.patchValue(this.User.nvEmail);
          this.PhoneNumber.patchValue(this.User.nvTel);
          this.IDFormControl.patchValue(this.User.nvID);
          // this.nvUserNameFormControl.patchValue(this.User.nvUserName)
          this.getListsValues();
        });

      }
      else {
        this.User = new User();
              this.getListsValues();
      }
    });
  }

  ngOnInit() {
  }



  getListsValues() {
    this.getRooms();
    this.getFloors();
    this.getDepartments();
    this.getRoles();

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
  displayRoleFn(role?: SysTableRow): string | undefined {
    console.log();
    return role ? role.nvSysTableRowName : undefined;
  }
  onSelectionChanged(value: any, id: number) {
    console.log(value.iSysTableRowId);
    switch (id) {
      case 1:
        this.User.iRoom = value.iSysTableRowId;
        break;
      case 2:
        this.User.iFloor = value.iSysTableRowId;
        break;
      case 3:
        this.User.iDepartment = value.iSysTableRowId;
        break;
      case 4:
        this.User.iRoleId = value.iSysTableRowId;
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
          if (this.dialogData || (this.isEdit == 'true'))
            this.roomsControl.setValue({ nvSysTableRowName: this.User.nvRoomName });
          // this.roomName = this.listRooms.filter(iroom => iroom.iSysTableRowId == this.User.iRoom)[0].nvSysTableRowName;
          // this.roomsControl.setValue({ nvSysTableRowName: this.roomName });
          console.log(this.listRooms);
        }
        else {
          alert("אין משתמשים מתאימים להרשאה")
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
          if (this.dialogData || (this.isEdit == 'true'))
            this.floorsControl.setValue({ nvSysTableRowName: this.User.nvFloorName });
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
          if (this.dialogData || (this.isEdit == 'true')) { this.departmentControl.setValue({ nvSysTableRowName: this.User.nvDepartmentName }); }
        }
        else {
          alert("אין משתמשים מתאימים להרשאה")
        }
      }
      );
    }
  }
  getRoles() {
    {
      this.listRoles = [];
      // this.Pniot.iTool=option.iToolId;
      // console.log(option.iToolId);
      this.proxy.GetSysTableRow(constants.ROLE).then(res => {
        this.listRoleRow = res;
        if (this.listRoleRow) {
          this.listRoleRow.forEach(element => {
            let tmp = {
              iSysTableRowId: element.iSysTableRowId,
              nvSysTableRowName: element.nvSysTableRowName,
            }
            this.listRoles.push(tmp);
          });
          this.setRolesList()
          if (this.dialogData || (this.isEdit == 'true')) {
          this.roomName = this.listRoles.filter(rule => rule.iSysTableRowId == this.User.iRoleId)[0].nvSysTableRowName;
            this.rolesControl.setValue({ nvSysTableRowName: this.roomName });
          }
        }
        else {
          alert("אין משתמשים מתאימים להרשאה")
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
  setRolesList() {
    this.filteredRoleOptions = this.rolesControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nvSysTableRowName),
        map(name => name ? this.roleFilter(name) : this.listRoles.slice())
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
  private roleFilter(name: string): any[] {
    const filterFaultValue = name.toLowerCase();
    return this.listRoles.filter(option => option.nvSysTableRowName.toLowerCase().indexOf(filterFaultValue) === 0);
  }
  Register() {
    this.User.nvEmail = this.emailFormControl.value;
    this.User.nvTel = this.PhoneNumber.value;
    this.User.nvID= this.IDFormControl.value;
    // this.User.nvUserName=this.nvUserNameFormControl.value;
    this.proxy.Register(this.User).then(res => {
      if(this.dialogData)
      {this.closeWindow();}
    });
  }
  closeWindow() {
    this.dialogRef.close();
  }
  disabledButton()
  {
    return !(this.emailFormControl.valid&&this.PhoneNumber.valid&&this.IDFormControl.valid);
  }
}
