import { Component } from '@angular/core';
// import { CommunicationService } from '../@core/services/communication.service';
import { NbMenuItem } from '@nebular/theme';

@Component({
    selector: 'ngx-pages',
    template: `
  <ngx-sample-layout>
  <nb-menu [items]="menu"></nb-menu>
  <router-outlet></router-outlet>
  </ngx-sample-layout>
  `,
})
export class PagesComponent {
    menu: NbMenuItem[] = null;
    // private com: CommunicationService
    constructor() {
        this.menu = [
            {
                title: 'aaaaaa',
                icon: 'nb-bar-chart',
                children: [
                    {
                        title: 'bbbbbbbbbbbb',
                        link: '/pages/reports/dashboard-and-alert-kpis'
                    }
                    , {
                        title: 'ccccccccccccccc',
                        link: '/pages/reports/store-periodic-productivity',
                    }
                    , {
                        title: 'this.StoreHourlyProductivity',
                        link: '/pages/reports/store-hourly-productivity',
                    }
                    , {
                        title: 'this.DailyProductivityPerDriver',
                        link: '/pages/reports/daily-productivity-per-driver',
                    }
                    , {
                        title: 'this.DeliveryAnalysis',
                        link: '/pages/reports/delivery-analysis',
                    }
                    , {
                        title: 'this.DailyPerformance',
                        link: '/pages/reports/daily-performance'
                    }
                    , {
                        title: 'this.DailyView',
                        link: '/pages/reports/daily-view'
                    }
                    , {
                        title: 'this.ReturnCustomers',
                        link: '/pages/reports/return-customers'
                    }
                    , {
                        title: 'this.Eta',
                        link: '/pages/reports/eta'
                    }
                    , {
                        title: 'this.MainPage',
                        link: '/pages/reports/main-page',
                    }
                ]
            },
            {
                title: 'this.AlertsAndDetailsTitle',
                icon: 'nb-bar-chart',
                children: [
                    {
                        title: 'this.DetailedOrderByOrder',
                        link: '/pages/reports/detailed-order-by-order',
                    }

                ]
            }

        ];
    }
    ngOnInit() {
    }
}
