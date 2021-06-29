import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaalichComponent } from './taalich.component';

describe('TaalichComponent', () => {
  let component: TaalichComponent;
  let fixture: ComponentFixture<TaalichComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaalichComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaalichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
