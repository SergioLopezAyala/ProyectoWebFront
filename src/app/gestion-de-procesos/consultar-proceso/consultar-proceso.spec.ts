import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultarProceso } from './consultar-proceso';

describe('ConsultarProceso', () => {
  let component: ConsultarProceso;
  let fixture: ComponentFixture<ConsultarProceso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarProceso]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultarProceso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
