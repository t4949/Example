import { Component, OnInit, ViewChild,OnChanges, NgZone } from '@angular/core';
import { userInfo } from 'os';
import { User } from '../Models/User';
import { ProxyService } from '../proxy.service';
import { Router ,ActivatedRoute} from '@angular/Router';
import { Pniot } from '../Models/Pniot';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaalichComponent } from '../pniot/taalich/taalich.component';
import { NewPniaComponent } from '../pniot/new-pnia/new-pnia.component';
import { constants } from '../constants';
// import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pniot-list',
  templateUrl: './pniot-list.component.html',
  styleUrls: ['./pniot-list.component.css']
})

export class PniotListComponent implements OnInit ,OnChanges{
  constants: any = constants;
  displayedColumns: string[] = ['dPniaDate','nvSubject', 'nvPhoneName', 'nvDepartmentName', 'nvFloorName', 'nvRoomName', 
  // 'nvKindFaultName',
   'nvStatusName', 'nvKindToolName','iPriority', 'nvMetapelName','edit', 'taalich'];
  filteredValues = {
    dPniaDate: '',nvSubject:'', nvPhoneName: '', nvDepartmentName: '', iPriority:'',
    nvFloorName: '', nvRoomName: '', nvStatusName: '', nvKindToolName: '', nvMetapelName: ''
  };
  Pniot: any[];
  dataSource;
  constructor(private proxy: ProxyService, private router: Router, public dialog: MatDialog,private route: ActivatedRoute,private zone:NgZone) {
  }
  dPniaDateFilter = new FormControl();
  iPriorityFilter=new FormControl();
  nvPhoneNameFilter = new FormControl();
  nvDepartmentNameFilter = new FormControl();
  nvFloorNameFilter = new FormControl();
  nvRoomNameFilter = new FormControl();
  // nvKindFaultNameFilter = new FormControl();
  nvStatusNameFilter = new FormControl();
  nvKindToolNameFilter = new FormControl();
  nvMetapelNameFilter = new FormControl();
  nvSubjectFilter=new FormControl();
  panelOpenState = false;
  globalFilter = '';
  isHistory:boolean;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.proxy.pniotUpdated.subscribe (res => {
      this.GetPniot();
    this.zone.run(() => {
    });
 });
    this.route.params.subscribe(params => {
      this.isHistory = params['isHistory'];
      this.GetPniot();
    this.setFilters();
    this.paginator._intl.itemsPerPageLabel="מספר פריטים לעמוד"
      });
   

  }
 ngOnChanges(){
 
 }
  setFilters() {
    this.iPriorityFilter.valueChanges.subscribe((iPriorityFilterValue) => {
      this.filteredValues['iPriority'] = iPriorityFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.dPniaDateFilter.valueChanges.subscribe((dPniaDateFilterValue) => {
      this.filteredValues['dPniaDate'] = dPniaDateFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.nvSubjectFilter.valueChanges.subscribe((nvSubjectFilterValue) => {
      this.filteredValues['nvSubject'] = nvSubjectFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.nvPhoneNameFilter.valueChanges.subscribe((nvPhoneNameFilterValue) => {
      this.filteredValues['nvPhoneName'] = nvPhoneNameFilterValue;
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
    // this.nvKindFaultNameFilter.valueChanges.subscribe((nvKindFaultNameFilterValue) => {
    //   this.filteredValues['nvKindFaultName'] = nvKindFaultNameFilterValue;
    //   this.dataSource.filter = JSON.stringify(this.filteredValues);
    // });
    this.nvStatusNameFilter.valueChanges.subscribe((nvStatusNameFilterValue) => {
      this.filteredValues['nvStatusName'] = nvStatusNameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.nvKindToolNameFilter.valueChanges.subscribe((nvKindToolNameFilterValue) => {
      this.filteredValues['nvKindToolName'] = nvKindToolNameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.nvMetapelNameFilter.valueChanges.subscribe((nvMetapelNameFilterValue) => {
      this.filteredValues['nvMetapelName'] = nvMetapelNameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    // this.dataSource.filterPredicate = this.customFilterPredicate();
  }
  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
       return data.nvPhoneName.toLowerCase().indexOf(searchTerms.nvPhoneName) !== -1
        && data.nvDepartmentName.toLowerCase().indexOf(searchTerms.nvDepartmentName) !== -1
       && data.dPniaDate.toLowerCase().indexOf(searchTerms.dPniaDate) !== -1
        && data.nvFloorName.toLowerCase().indexOf(searchTerms.nvFloorName) !== -1
        && data.nvRoomName.toLowerCase().indexOf(searchTerms.nvRoomName) !== -1
        // && data.nvKindFaultName.toLowerCase().indexOf(searchTerms.nvKindFaultName) !== -1
        && data.nvKindToolName.toLowerCase().indexOf(searchTerms.nvKindToolName) !== -1
        // && data.nvMetapelName.toLowerCase().indexOf(searchTerms.nvMetapelName) !== -1
        && String(data.iPriority).toLowerCase().indexOf(searchTerms.iPriority) !== -1;
         
    }
    return filterFunction;
  }
  GetPniot() {
      this.proxy.GetPniot(this.proxy.User.iUserId,this.isHistory).then(res => {
     this.Pniot = res;
          // this.Pniot.forEach(element => {
      //   if(element.dPniaDate!=null || element.dPniaDate !=undefined)
      //   {
      //   let dt= new Date(element.dPniaDate.match(/\d+/)[0] * 1)
      //   element.dPniaDate=dt.toLocaleDateString();
      //   }
      // });
      this.dataSource = new MatTableDataSource(this.Pniot);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
    }
    )
  }

  openTaalich(pnia:Pniot) {
      this.dialog.open(TaalichComponent, {
      // height: '800px',
      width:'1000px',
      data: {pniaId:pnia.iPniaId,pniaSubject:pnia.nvSubject}
    });
  }

  Edit(pnia:Pniot) {
      this.dialog.open(NewPniaComponent, {
      // height: '1000px',
      width:'1000px',
      data: {pnia:pnia}
    });
  }


}
