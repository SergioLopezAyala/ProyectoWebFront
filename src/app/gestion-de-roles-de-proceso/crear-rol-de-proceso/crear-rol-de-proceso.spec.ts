import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearRolDeProceso } from './crear-rol-de-proceso';

describe('CrearRolDeProceso', () => {
  let component: CrearRolDeProceso;
  let fixture: ComponentFixture<CrearRolDeProceso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearRolDeProceso]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearRolDeProceso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
