import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultLogementComponent } from './consult-logement.component';

describe('ConsultLogementComponent', () => {
  let component: ConsultLogementComponent;
  let fixture: ComponentFixture<ConsultLogementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultLogementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultLogementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
