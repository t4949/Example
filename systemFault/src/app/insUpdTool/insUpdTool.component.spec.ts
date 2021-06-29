import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { insUpdToolComponent } from './insUpdTool.component';

describe('insUpdToolComponent', () => {
  let component: insUpdToolComponent;
  let fixture: ComponentFixture<insUpdToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ insUpdToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(insUpdToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
