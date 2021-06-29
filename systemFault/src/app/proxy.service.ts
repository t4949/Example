import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { promise } from 'protractor';
import { User } from './Models/User';
import { userInfo } from 'os';
import { Pniot } from './Models/Pniot';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { Tool } from './Models/Tool';
import { Router } from '@angular/Router';



@Injectable({
  providedIn: 'root'
})
export class ProxyService {
  User: User;
  Tool: Tool
  sysTableUpdated:EventEmitter<any>;
  usersUpdated: EventEmitter<any>;
  pniotUpdated: EventEmitter<any>;
  toolsUpdated: EventEmitter<any>;
  @Injectable()

  public url: string;
  constructor(private http: Http, private _snackBar: MatSnackBar, private router: Router) {
    this.User = new User();
    this.usersUpdated = new EventEmitter<any>();
    this.pniotUpdated = new EventEmitter<any>();
    this.toolsUpdated = new EventEmitter<any>();
    this.sysTableUpdated=new EventEmitter<any>();
  }
  openSnackBar(message: string, action: string) {
    let horizontalPosition: MatSnackBarHorizontalPosition = 'left';
    let verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    let config = new MatSnackBarConfig();
    config.verticalPosition = verticalPosition;
    config.horizontalPosition = horizontalPosition;
    config.duration = 3000;
    this._snackBar.open(message, action, config);
  }
  // LoginUser(): Promise<any> {
  //   //this.url = "http://localhost:1908//Service1.svc//";
  //   return this.http.get("http://localhost:1908//Service1.svc//LoginUser").toPromise()
  //     .then(this.extractData)
  //     .catch(this.handleErrorObservable);
  // }
  ResumePassword(nvID: string, nvPassword: string) {
    return this.http.post("http://localhost:1908//Service1.svc//RePassword", { nvID, nvPassword }).toPromise()
      .then((res: any) => {
        if (res._body == 1) { this.openSnackBar('ת.ז. לא קיימת', ''); }
        else if (res._body == 2) { this.openSnackBar('סיסמא קיימת', ''); }
        else if (res._body == 3) { this.openSnackBar('איפוס הסיסמא עבר בהצלחה', ''); }
        return res.json();
      })
      .catch(this.handleErrorObservable);
  }
  Login(nvUserName: string, nvPassword: string): Promise<any> {
    return this.http.post("http://localhost:1908//Service1.svc//Login", { nvUserName, nvPassword }).toPromise()
      .then((res: any) => {
        this.User = res;
        return res.json();
      })
      .catch(() => {
        this.openSnackBar('שם משתמש או סיסמא שגויים', 'ביטול');
      })
  }

  GetPniot(iUserId: number, isHistory: boolean): Promise<any> {
    return this.http.post("http://localhost:1908//Service1.svc//GetPniot", { iUserId, isHistory }).toPromise()
      .then((res: any) => {
        return res.json();
      })
      .catch(this.handleErrorObservable);
  }
  GetToolsList(): Promise<any> {
    return this.http.get("http://localhost:1908//Service1.svc//GetToolsList").toPromise()
      .then((res: any) => {
        return res.json();
      })
      .catch(this.handleErrorObservable);
  }
  GetSysTableRow(iTableId: number): Promise<any> {
    return this.http.post("http://localhost:1908//Service1.svc//GetSysTableRow", { iTableId }).toPromise()
      .then((res: any) => {
        return res.json();
      })
      .catch(this.handleErrorObservable);
  }
  // getBooksWithPromise(): Promise<any> {
  //   this.url = "http://localhost:1908//Service1.svc//";
  //   return this.http.get(this.url).toPromise()
  //     .then(this.extractData)
  //     .catch(this.handleErrorPromise);
  // }
  // addBookWithPromise(item: any): Promise<any> {
  //   this.url = "http://localhost:1908//Service1.svc//";
  //   let headers = new Headers({ 'Access-Control-Allow-Origin': '*' });
  //   let options = new RequestOptions({ headers: headers });
  //   return this.http.post(this.url, item, options).toPromise()
  //     .then(this.extractData)
  //     .catch(this.handleErrorPromise);
  // }
  Register(user: User): Promise<any> {

    return this.http.post("http://localhost:1908//Service1.svc//Register", { user }).toPromise()
      .then((res: any) => {
        console.log(res);
        if (res._body == -1) { this.openSnackBar('סיסמא קיימת', 'ביטול'); }
        else if (res._body == 1) {
          if (user.iUserId == -1) { this.openSnackBar('משתמש חדש נוסף בהצלחה', 'ביטול'); }
          else {
            this.openSnackBar('משתמש התעדכן בהצלחה', 'ביטול');
            this.usersUpdated.emit()
          }
        }
        else if (res._body == 0) {
          this.openSnackBar('תקלה בשמירת משתמש', 'ביטול');
        }
        return res.json();
      })
      .catch(this.handleErrorObservable);
  }
  saveTool(tool: Tool): Promise<any> {
    return this.http.post("http://localhost:1908//Service1.svc//SaveTool", { tool }).toPromise()
      .then((res: any) => {
        if (tool.iToolId == -1)
          this.openSnackBar('מכשיר חדש נוסף בהצלחה', 'ביטול');
        else {
          this.openSnackBar('מכשיר התעדכן בהצלחה', 'ביטול');
          this.toolsUpdated.emit();
        }
        return res.json();
      })
      .catch(this.handleErrorObservable);
  }
  AddPnia(pniot: Pniot): Promise<any> {
    return this.http.post("http://localhost:1908//Service1.svc//AddPnia", { pniot }).toPromise()
      .then((res: any) => {
        if (pniot.iPniaId == -1) {
                   this.openSnackBar('פניה חדשה נוספה בהצלחה', 'ביטול');
          this.router.navigateByUrl('pniot-list/false');
        }
        //(toaster) הצגת הודעת למשתמש
        else { this.openSnackBar('פניה התעדכנה בהצלחה', 'ביטול'); }
        this.pniotUpdated.emit();
        return res.json();
      })
      .catch(this.handleErrorObservable);
  }
  GetTaalichPnia(iPniaId: number): Promise<any> {
    return this.http.post("http://localhost:1908//Service1.svc//GetTaalichPnia", { iPniaId }).toPromise()
      .then((res: any) => {
        return res.json();
      })
      .catch(this.handleErrorObservable);
  }
  saveTaalichPnia(iPniaId: number, iUserId: number, nvTallichPniaContent: string): Promise<any> {
    return this.http.post("http://localhost:1908//Service1.svc//saveTaalichPnia", { iPniaId, iUserId, nvTallichPniaContent }).toPromise()
      .then((res: any) => {
        return res.json();
      })
      .catch(this.handleErrorObservable);

  }

  GetPnia(iPniaId: number): Promise<any> {
    return this.http.post("http://localhost:1908//Service1.svc//GetPnia", { iPniaId }).toPromise()
      .then((res: any) => {
        return res.json();
      })
      .catch(this.handleErrorObservable);

  }

  GetUser(iUserId: number): Promise<any> {
    return this.http.post("http://localhost:1908//Service1.svc//GetUser", { iUserId }).toPromise()
      .then((res: any) => {
        return res.json();
      })
      .catch(this.handleErrorObservable);

  }
  GetTool(iToolId: number): Promise<any> {
    return this.http.post("http://localhost:1908//Service1.svc//GetTool", { iToolId }).toPromise()
      .then((res: any) => {
        return res.json();
      })
      .catch(this.handleErrorObservable);

  }




  movePniaToHistory(iPniaId: number): Promise<any> {
    return this.http.post("http://localhost:1908//Service1.svc//movePniaToHistory", { iPniaId }).toPromise()
      .then((res: any) => {
        this.openSnackBar('סגירה בוצעה בהצלחה', 'ביטול');
        this.pniotUpdated.emit();
        return res.json();
      })
      .catch(this.handleErrorObservable);
  }
  GetUsers(): Promise<any> {
    return this.http.get("http://localhost:1908//Service1.svc//GetUsers").toPromise()
      .then((res: any) => {
        return res.json();
      })
      .catch(this.handleErrorObservable);
  }
  GetToolsTable(): Promise<any> {
    return this.http.get("http://localhost:1908//Service1.svc//GetToolsTable").toPromise()
      .then((res: any) => {
        return res.json();
      })
      .catch(this.handleErrorObservable);
  }


  DeleteUser(iRowId: number): Promise<any> {
    return this.http.post("http://localhost:1908//Service1.svc//DeleteUser", { iRowId }).toPromise()
      .then((res: any) => {
        this.openSnackBar('משתמש נמחק בהצלחה', 'ביטול');
        this.usersUpdated.emit()
        return res.json();
      })
      .catch(this.handleErrorObservable);
  }
  DeleteTool(iRowId: number): Promise<any> {
    return this.http.post("http://localhost:1908//Service1.svc//DeleteTool", { iRowId }).toPromise()
      .then((res: any) => {
        this.openSnackBar('מכשיר נמחק בהצלחה', 'ביטול');
        return res.json();
      })
      .catch(this.handleErrorObservable);
  }
  GetSysTable(): Promise<any> {
    return this.http.get("http://localhost:1908//Service1.svc//GetSysTable").toPromise()
      .then((res: any) => {
        return res.json();
      })
      .catch(this.handleErrorObservable);
  }
  SaveSysTableRow(iSysTableRowId:number,nvSysTableRowName:string,tableId:number): Promise<any> {
    return this.http.post("http://localhost:1908//Service1.svc//SaveSysTableRow",{iSysTableRowId,nvSysTableRowName,tableId}).toPromise()
      .then((res: any) => {
        this.sysTableUpdated.emit();
        return res.json();
      })
      .catch(this.handleErrorObservable);
  }
  DeleteSysTableRow(iSysTableRowId:number): Promise<any> {
    return this.http.post("http://localhost:1908//Service1.svc//DeleteSysTableRow",{iSysTableRowId}).toPromise()
      .then((res: any) => {
        this.sysTableUpdated.emit();
        return res.json();
      })
      .catch(this.handleErrorObservable);
  }
  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }
  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
  private handleErrorPromise(error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }
} 