import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProspectosComponent } from './listar-prospectos.component';

describe('ListarProspectosComponent', () => {
  let component: ListarProspectosComponent;
  let fixture: ComponentFixture<ListarProspectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarProspectosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarProspectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
