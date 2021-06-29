import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/Router';
// import { PniotListComponent } from '../pniot/pniot-list/pniot-list.component';
import { NewPniaComponent } from '../pniot/new-pnia/new-pnia.component';
import { MenuComponent } from '../menu/menu.component';
import { LoginComponent } from '../login/login.component';
import { PniotListComponent } from '../pniot-list/pniot-list.component';
import { RegisterComponent } from '../register/register.component';
import { UserComponent } from '../Users/user.component';
import { QuickSupprtComponent } from '../quick-supprt/quick-supprt.component';
import { toolsComponent } from '../Tools/tools.component';
import { insUpdToolComponent } from '../insUpdTool/insUpdTool.component';
import { RePasswordComponent } from '../re-password/re-password.component';
import { SysTableComponent } from '../sys-table/sys-table.component';


const ROUTES: Routes = [
  { path: 'Menu', component: MenuComponent,
  children:[
    {path: 'pniot-list/:isHistory', component: PniotListComponent,pathMatch: 'prefix'},
       { path: 'Menu', component: MenuComponent },
    { path: 'new-pnia', component: NewPniaComponent },
    { path: 'register/:isEdit', component: RegisterComponent },
    { path: 'user', component: UserComponent },
    { path: 'quick-supprt', component: QuickSupprtComponent },
    { path: 'tools', component: toolsComponent },
    { path: 'insUpdtools/:isEdit', component: insUpdToolComponent  },
    { path: 'sysTable', component: SysTableComponent  }
    
      ]
  },
  { path: 'login', component: LoginComponent },
  { path:'re-password',component:RePasswordComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES)
 
  ],
  exports: [RouterModule]
})

export class RoutingModule { }
