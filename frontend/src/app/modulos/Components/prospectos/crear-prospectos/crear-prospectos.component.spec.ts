import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearProspectosComponent } from './crear-prospectos.component';

describe('CrearProspectosComponent', () => {
  let component: CrearProspectosComponent;
  let fixture: ComponentFixture<CrearProspectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearProspectosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearProspectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
