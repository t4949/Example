import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsUpdSysRowComponent } from './ins-upd-sys-row.component';

describe('InsUpdSysRowComponent', () => {
  let component: InsUpdSysRowComponent;
  let fixture: ComponentFixture<InsUpdSysRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsUpdSysRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsUpdSysRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
