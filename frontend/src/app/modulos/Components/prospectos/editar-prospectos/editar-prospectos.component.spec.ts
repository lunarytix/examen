import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProspectosComponent } from './editar-prospectos.component';

describe('EditarProspectosComponent', () => {
  let component: EditarProspectosComponent;
  let fixture: ComponentFixture<EditarProspectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarProspectosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarProspectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
