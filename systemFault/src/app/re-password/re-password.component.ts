import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { ProxyService } from '../proxy.service';
import { Route, Router } from '@angular/Router';


@Component({
  selector: 'app-re-password',
  templateUrl: './re-password.component.html',
  styleUrls: ['./re-password.component.css']
})
export class RePasswordComponent implements OnInit {
  nvID:string;
  nvPassword:string;

  constructor(private proxy:ProxyService,private router:Router) { }

  ngOnInit() {
  }
  /*Login(){
    
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
  }*/
  ResumePassword()
  {
    this.proxy.ResumePassword(this.nvID,this.nvPassword).then(res=>
      {
      
        if(res)
        {
         this.router.navigateByUrl('login');
        }
        else {
        }
      }
    );
    }
}
