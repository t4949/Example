import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PniotListComponent } from './pniot-list.component';

describe('PniotListComponent', () => {
  let component: PniotListComponent;
  let fixture: ComponentFixture<PniotListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PniotListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PniotListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
