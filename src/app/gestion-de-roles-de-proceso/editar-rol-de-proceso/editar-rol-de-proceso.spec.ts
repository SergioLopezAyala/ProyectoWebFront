import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRolDeProceso } from './editar-rol-de-proceso';

describe('EditarRolDeProceso', () => {
  let component: EditarRolDeProceso;
  let fixture: ComponentFixture<EditarRolDeProceso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarRolDeProceso]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarRolDeProceso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
