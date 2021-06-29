import { Component, ChangeDetectorRef ,OnDestroy } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { Route, Router } from '@angular/Router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   {
  title = 'SystemFault';
 

  constructor(private router:Router ) {
    this.router.navigateByUrl('login');
  }

}
