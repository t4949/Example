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
import { Tool } from '../Models/Tool';
import { insUpdToolComponent } from '../insUpdTool/insUpdTool.component';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
// public iToolId: number=-1;
// public nvToolName:string=null;
// public iNumFault:number=null;
// public dcreateDate:Date=null;
// public iFloor:number=null;
// public iRoom:number=null;
// public iDepartment:number=null;
// public iCompany:number=null;
// public iKindToolId:number=null;
// public iStatusRow:number=null;
// public nvFloorName:string=null;
// public nvRoomName:string=null;
// public nvDepartmentName:string=null;
// public nvCompanyName:string=null;
// // public nvKindToolName:string=null;
export class toolsComponent implements OnInit {
  displayedColumns: string[] = ['nvToolName', 'iNumFault', 'dcreateDate', 'nvCompanyName', 'nvKindToolName',
  'nvDepartmentName','nvRoomName','nvFloorName','edit', 'delete'];
  filteredValues = {
    nvToolName: '',iNumFault:'', dcreateDate: '', nvCompanyName: '',
    nvKindToolName: '', nvDepartmentName: '', nvRoomName: '', nvFloorName: ''
      };
  dataSource;
  tools:Tool[];
  nvToolNameFilter = new FormControl();
  iNumFaultFilter = new FormControl();
  dcreateDateFilter = new FormControl();
  nvKindToolNameFilter = new FormControl();
  nvCompanyNameFilter = new FormControl();
  nvDepartmentNameFilter = new FormControl();
  nvRoomNameFilter=new FormControl();
  nvFloorNameFilter=new FormControl();
   constructor(private proxy:ProxyService,private router:Router, public dialog: MatDialog,private zone:NgZone) {
    }
     @ViewChild(MatSort) sort: MatSort;
   @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
   this.setFilters();
   this.GetTools();
   this.proxy.toolsUpdated.subscribe (res => {
    this.GetTools();
  this.zone.run(() => {
  });
});
  }
  setFilters() {
   
    this.nvToolNameFilter.valueChanges.subscribe((nvnvToolNameFilterValue) => {
      this.filteredValues['nvToolName'] = nvnvToolNameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.iNumFaultFilter.valueChanges.subscribe((nviNumFaultFilterValue) => {
      this.filteredValues['iNumFault'] = nviNumFaultFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.dcreateDateFilter.valueChanges.subscribe((dcreateDateFilterValue) => {
      this.filteredValues['dcreateDate'] = dcreateDateFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.nvCompanyNameFilter.valueChanges.subscribe((nvCompanyNameFilterValue) => {
      this.filteredValues['nvCompanyName'] = nvCompanyNameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.nvDepartmentNameFilter.valueChanges.subscribe((nvDepartmentNameFilterValue) => {
      this.filteredValues['nvDepartmentName'] = nvDepartmentNameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.nvFloorNameFilter.valueChanges.subscribe((nvFloorNameFilterValue) => {
      this.filteredValues['nvFloorName'] = nvFloorNameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.nvRoomNameFilter.valueChanges.subscribe((nvRoomNameFilterValue) => {
      this.filteredValues['nvRoomName'] = nvRoomNameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    // this.dataSource.filterPredicate = this.customFilterPredicate();
  }
  createFilter(): (data: any, filter: string) => boolean {
     // nvToolName: '',iNumFault:'', dcreateDate: '', nvCompanyName: '',
    // nvKindToolName: '', nvDepartmentName: '', nvRoomName: '', nvFloorName: ''
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
       return data.nvToolName.toLowerCase().indexOf(searchTerms.nvToolName) !== -1
        && data.iNumFault.toString().toLowerCase().indexOf(searchTerms.iNumFault) !== -1
        && data.dcreateDate.toLowerCase().indexOf(searchTerms.dcreateDate) !== -1
              && data.nvCompanyName.toLowerCase().indexOf(searchTerms.nvCompanyName) !== -1
        && data.nvKindToolName.toLowerCase().indexOf(searchTerms.nvKindToolName) !== -1
        && data.nvDepartmentName.toLowerCase().indexOf(searchTerms.nvDepartmentName) !== -1
        && data.nvFloorName.toLowerCase().indexOf(searchTerms.nvFloorName) !== -1
        && data.nvRoomName.toLowerCase().indexOf(searchTerms.nvRoomName) !== -1;
      
         
    }
    return filterFunction;
  }

  GetTools() {
    console.log(this.proxy.User.iUserId);
    this.proxy.GetToolsTable().then(res => {
      this.tools = res;
      this.dataSource = new MatTableDataSource(this.tools);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
    }
    )
  }
  Edit(tool:Tool) {
    console.log(tool);
    this.dialog.open(insUpdToolComponent , {
      width:'1000px',
      data: {toolId:tool.iToolId}
    });
  }
  delete(iToolId:any){
    console.log("toolId from tool component",iToolId);
        this.dialog.open(DeleteComponent, {
      height: '250px',
      width:'500px',
      data: {iToolId:iToolId}
    });
  }


}
