import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPniaComponent } from './new-pnia.component';

describe('NewPniaComponent', () => {
  let component: NewPniaComponent;
  let fixture: ComponentFixture<NewPniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
