import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarRolDeProceso } from './eliminar-rol-de-proceso';

describe('EliminarRolDeProceso', () => {
  let component: EliminarRolDeProceso;
  let fixture: ComponentFixture<EliminarRolDeProceso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarRolDeProceso]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarRolDeProceso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
