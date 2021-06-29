import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './routing/routing.module';
import { Router } from '@angular/router';
import { ScreenComponent } from './screen/screen.component';
// import { PniotListComponent } from './pniot/pniot-list/pniot-list.component';
import { NewPniaComponent } from './pniot/new-pnia/new-pnia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MenuComponent } from './menu/menu.component';
import {MatMenuModule} from '@angular/material/menu';
import {TableModule} from 'primeng/table';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PniotListComponent } from './pniot-list/pniot-list.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {EditorModule} from 'primeng/editor';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import {MatSortModule} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import { TaalichComponent } from './pniot/taalich/taalich.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { UserComponent } from './Users/user.component';
import { DeleteComponent } from './delete/delete.component';
import {RatingModule} from 'primeng/rating';
import { QuickSupprtComponent } from './quick-supprt/quick-supprt.component';
import { DatePipe } from '@angular/common';
import { toolsComponent } from './Tools/tools.component';
import { insUpdToolComponent } from './insUpdTool/insUpdTool.component';
import { RePasswordComponent } from './re-password/re-password.component';
import { SysTableComponent } from './sys-table/sys-table.component';
import { InsUpdSysRowComponent } from './ins-upd-sys-row/ins-upd-sys-row.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ScreenComponent,
   // PniotListComponent,
    NewPniaComponent,
    RegisterComponent,
    MenuComponent,
   PniotListComponent,
    TaalichComponent,
      UserComponent,
    DeleteComponent,
    QuickSupprtComponent,
    toolsComponent,
    insUpdToolComponent,
    RePasswordComponent,
      SysTableComponent,
    InsUpdSysRowComponent
       ],
  imports: [
    RatingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    HttpModule,
    HttpClientModule,
    RoutingModule,
    FormsModule,
    CalendarModule,
    InputTextareaModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatSliderModule,
    MatCardModule,
    MatExpansionModule,
    MatMenuModule,
    TableModule,
    Ng2SmartTableModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    EditorModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSnackBarModule
     ],
  providers: [DatePipe],
  entryComponents: [TaalichComponent,DeleteComponent,QuickSupprtComponent,insUpdToolComponent,InsUpdSysRowComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
