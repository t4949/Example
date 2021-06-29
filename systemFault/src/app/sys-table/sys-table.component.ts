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
import { SysTableRow } from '../Models/SysTableRow';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
// import { insUpdSysRowComponent } from '../insUpdSysRow/insUpdSysRow.component';
import { InsUpdSysRowComponent } from '../ins-upd-sys-row/ins-upd-sys-row.component';

@Component({
  selector: 'app-sys-table',
  templateUrl: './sys-table.component.html',
  styleUrls: ['./sys-table.component.css']
})
export class SysTableComponent implements OnInit {
  displayedColumns: string[] = [ 'nvSysTableRowName','edit', 'delete'];
  listsyRows:SysTableRow[];
  filteredTableOptions: Observable<SysTableRow[]>;
  tableControl: FormControl=new FormControl();
   filteredValues = {
     iSysTableRowId: '',nvSysTableRowName:''
       };
   dataSource;
   sysRows:SysTableRow[];
   nvSysTableRowNameFilter = new FormControl();
   iSysTableRowIdFilter = new FormControl();
   Table:SysTableRow=new SysTableRow();
 
    constructor(private proxy:ProxyService,private router:Router, public dialog: MatDialog,private zone:NgZone) {
     }
   
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
   ngOnInit() {
   
    this.setFilters();
    this.getTables();
    
   }
   ngAfterViewInit(){
    this.proxy.sysTableUpdated.subscribe (res => {
      this.GetSysTableRow( this.Table.iSysTableRowId);
    this.zone.run(() => {
    });
 });
  }
   setFilters() {
    //  this.iSysTableRowIdFilter.valueChanges.subscribe((iSysTableRowIdFilterValue) => {
    //      this.filteredValues['iSysTableRowId'] = iSysTableRowIdFilterValue;
    //      this.dataSource.filter = JSON.stringify(this.filteredValues);
    //    });
     this.nvSysTableRowNameFilter.valueChanges.subscribe(( nvSysTableRowNameFilterValue) => {
       this.filteredValues[' nvSysTableRowName'] =  nvSysTableRowNameFilterValue;
       this.dataSource.filter = JSON.stringify(this.filteredValues);
     });
    
    
     
    
     // this.dataSource.filterPredicate = this.customFilterPredicate();
   }
   // iSysTableRowId
 // nvSysTableRowName
   createFilter(): (data: any, filter: string) => boolean {
     let filterFunction = function(data, filter): boolean {
       let searchTerms = JSON.parse(filter);
        // return data.iSysTableRowId.toLowerCase().indexOf(searchTerms.iSysTableRowId) !== -1
        return
         data.nvSysTableRowName.toLowerCase().indexOf(searchTerms.nvSysTableRowName) !== -1;
       
     }
     return filterFunction;
   }
   getTables() {
     {
       this.listsyRows = [];
       // this.Pniot.iTool=option.iToolId;
       // console.log(option.iToolId);
       this.proxy.GetSysTable().then(res => {
         let listsyRow = res;
         if (listsyRow) {
             listsyRow.forEach(element => {
             let tmp = {
               iSysTableRowId: element.iSysTableRowId,
               nvSysTableRowName: element.nvSysTableRowName,
             }
             this.listsyRows.push(tmp);
           });
           this.setTableList()
         
            this.tableControl.setValue({ nvSysTableRowName: this.listsyRows['0'].nvSysTableRowName });
            this.GetSysTableRow(this.listsyRows['0'].iSysTableRowId);
         //   this.roomName = this.listsyRows.filter(iroom => iroom.iSysTableRowId == this.User.iRoom)[0].nvSysTableRowName;
         //   this.roomsControl.setValue({ nvSysTableRowName: this.roomName });
           console.log(this.listsyRows);
         }
         else {
         //   alert("אין משתמשים מתאימים להרשאה")
         }
       }
       );
     }
   }
   onSelectionChanged(value: any, id: number) {
     console.log(value.iSysTableRowId);
     switch (id) {
       case 1:
         this.Table.iSysTableRowId = value.iSysTableRowId;
         this.Table.nvSysTableRowName = value.nvSysTableRowName;
         break;
       
     }
     this.GetSysTableRow( this.Table.iSysTableRowId);
   }
   displayTableFn(table?: SysTableRow): string | undefined {
     console.log();
     return table ? table.nvSysTableRowName : undefined;
   }
   private tableFilter(name: string): any[] {
     const filterFaultValue = name.toLowerCase();
     return this.listsyRows.filter(option => option.nvSysTableRowName.toLowerCase().indexOf(filterFaultValue) === 0);
   }
   setTableList() {
     this.filteredTableOptions = this.tableControl.valueChanges
       .pipe(
         startWith(''),
         map(value => typeof value === 'string' ? value : value.nvSysTableRowName),
         map(name => name ? this.tableFilter(name) : this.listsyRows.slice())
       );
   }
   GetSysTableRow(iSysTableRowId:number) {
        console.log(this.proxy.User.iUserId);
     this.proxy.GetSysTableRow(iSysTableRowId).then(res => {
       this.sysRows = res;
       this.dataSource = new MatTableDataSource(this.sysRows);
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
     //   this.dataSource.filterPredicate = this.createFilter();
     }
     )
   }
   NewRow() {
    this.dialog.open(InsUpdSysRowComponent, {
      // height: '250px',
       width:'500px',
       data: {sysRow:new SysTableRow(),tableId:this.Table.iSysTableRowId}
     });
   }
   Edit(sysRow:SysTableRow) {
        this.dialog.open(InsUpdSysRowComponent, {
      // height: '250px',
       width:'500px',
       data: {sysRow:sysRow,tableId:this.Table.iSysTableRowId}
     });
   }
   delete(sysRow:SysTableRow){
     this.dialog.open(DeleteComponent, {
       height: '250px',
       width:'500px',
       data: {sysRowID:sysRow}
     });
   }
 
 
 }
