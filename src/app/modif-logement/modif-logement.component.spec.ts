import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifLogementComponent } from './modif-logement.component';

describe('ModifLogementComponent', () => {
  let component: ModifLogementComponent;
  let fixture: ComponentFixture<ModifLogementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifLogementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifLogementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
