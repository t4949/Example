import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProxyService } from '../proxy.service';
import { constants } from '../constants';
import { Route,Router } from '@angular/Router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit ,AfterViewInit {
  constants: any = constants;
  iRoleId
  title:string=''
  constructor(public proxy: ProxyService,public router:Router) { }
  ngOnInit() {
  }
  ngAfterViewInit(){
    this.iRoleId=this.proxy.User.iRoleId
  }
  NiTuk(){
    
    this.router.navigateByUrl('login');
  }
  textHeader(event)
  {
        this.title=event.currentTarget.innerText;
  }
}
