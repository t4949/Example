import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickSupprtComponent } from './quick-supprt.component';

describe('QuickSupprtComponent', () => {
  let component: QuickSupprtComponent;
  let fixture: ComponentFixture<QuickSupprtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickSupprtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickSupprtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
