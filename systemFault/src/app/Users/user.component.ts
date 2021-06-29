import { Component, OnInit ,ViewChild, NgZone} from '@angular/core';
import { ProxyService } from '../proxy.service';
import { User } from '../Models/User';
import { Route, Router } from '@angular/Router';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { FormControl } from '@angular/forms';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = ['nvUserName', 'nvFirstName', 'nvLastName', 'nvID', 'nvPassword','nvEmail',
  'nvTel','nvDepartmentName','nvRoomName','nvFloorName','edit', 'delete'];
  filteredValues = {
    nvUserName: '',nvFirstName:'', nvLastName: '', nvID: '',
    nvPassword: '', nvEmail: '', nvTel: '', nvDepartmentName: '', nvRoomName: '', nvFloorName: ''
      };
  dataSource;
  Users:User[];
  nvUserNameFilter = new FormControl();
  nvFirstNameFilter = new FormControl();
  nvLastNameFilter = new FormControl();
  nvIDFilter = new FormControl();
  nvPasswordFilter = new FormControl();
  nvEmailFilter = new FormControl();
  nvTelFilter = new FormControl();
  nvDepartmentNameFilter = new FormControl();
  nvRoomNameFilter=new FormControl();
  nvFloorNameFilter=new FormControl();
   constructor(private proxy:ProxyService,private router:Router, public dialog: MatDialog,private zone:NgZone) {
    }
  
   @ViewChild(MatSort) sort: MatSort;
   @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.proxy.usersUpdated.subscribe (res => {
    this.GetUsers();
    this.zone.run(() => {
      });
   });
   this.setFilters();
   this.GetUsers();
  }
  setFilters() {
  
    this.nvUserNameFilter.valueChanges.subscribe((nvUserNameFilterValue) => {
      this.filteredValues['nvUserName'] = nvUserNameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.nvFirstNameFilter.valueChanges.subscribe((nvPhoneNameFilterValue) => {
      this.filteredValues['nvFirstName'] = nvPhoneNameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.nvLastNameFilter.valueChanges.subscribe((nvDepartmentNameFilterValue) => {
      this.filteredValues['nvLastName'] = nvDepartmentNameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.nvIDFilter.valueChanges.subscribe((nvFloorNameFilterValue) => {
      this.filteredValues['nvID'] = nvFloorNameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.nvPasswordFilter.valueChanges.subscribe((nvRoomNameFilterValue) => {
      this.filteredValues['nvPassword'] = nvRoomNameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.nvEmailFilter.valueChanges.subscribe((nvKindFaultNameFilterValue) => {
      this.filteredValues['nvEmail'] = nvKindFaultNameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.nvTelFilter.valueChanges.subscribe((nvStatusNameFilterValue) => {
      this.filteredValues['nvTel'] = nvStatusNameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.nvDepartmentNameFilter.valueChanges.subscribe((nvKindToolNameFilterValue) => {
      this.filteredValues['nvDepartmentName'] = nvKindToolNameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.nvFloorNameFilter.valueChanges.subscribe((nvMetapelNameFilterValue) => {
      this.filteredValues['nvFloorName'] = nvMetapelNameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.nvRoomNameFilter.valueChanges.subscribe((nvMetapelNameFilterValue) => {
      this.filteredValues['nvRoomName'] = nvMetapelNameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    // this.dataSource.filterPredicate = this.customFilterPredicate();
  }
  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
       return data.nvUserName.toLowerCase().indexOf(searchTerms.nvUserName) !== -1
        && data.nvFirstName.toLowerCase().indexOf(searchTerms.nvFirstName) !== -1
        && data.nvLastName.toLowerCase().indexOf(searchTerms.nvLastName) !== -1
        && data.nvID.toLowerCase().indexOf(searchTerms.nvID) !== -1
        && data.nvPassword.toLowerCase().indexOf(searchTerms.nvPassword) !== -1
        && data.nvEmail.toLowerCase().indexOf(searchTerms.nvEmail) !== -1
        && data.nvTel.toLowerCase().indexOf(searchTerms.nvTel) !== -1
        && data.nvDepartmentName.toLowerCase().indexOf(searchTerms.nvDepartmentName) !== -1
        && data.nvFloorName.toLowerCase().indexOf(searchTerms.nvFloorName) !== -1
        && data.nvRoomName.toLowerCase().indexOf(searchTerms.nvRoomName) !== -1;
      
         
    }
    return filterFunction;
  }

  GetUsers() {
    console.log(this.proxy.User.iUserId);
    this.proxy.GetUsers().then(res => {
      this.Users = res;
      this.dataSource = new MatTableDataSource(this.Users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
    }
    )
  }
  Edit(user:User) {
    console.log(user);
    this.dialog.open(RegisterComponent, {
      width:'1000px',
      data: {user:user}
    });
  }
  delete(iUserId:any){
    this.dialog.open(DeleteComponent, {
      height: '250px',
      width:'500px',
      data: {iUserId:iUserId}
    });
  }


}
