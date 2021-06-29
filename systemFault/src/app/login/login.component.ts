import { Component, OnInit } from '@angular/core';
import { ProxyService } from '../proxy.service';
import { User } from '../Models/User';
import { Route, Router } from '@angular/Router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  User:User;
  name:string="";
  password:string="";
   constructor(private proxy:ProxyService,private router:Router ) {
    this.User=new User();
   }

  ngOnInit() {
  }


  Login(){
    
    this.proxy.Login(this.name,this.password).then(res=>
      {
        this.User=res;
        if(this.User.iUserId)
        {
          this.proxy.User=res;
         this.router.navigateByUrl('Menu');
        }
        else {
        }
      }
    );
  }

}
