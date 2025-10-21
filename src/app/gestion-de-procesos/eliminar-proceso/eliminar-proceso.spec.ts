import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EliminarProceso } from './eliminar-proceso';

describe('EliminarProceso', () => {
  let component: EliminarProceso;
  let fixture: ComponentFixture<EliminarProceso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarProceso]
    }).compileComponents();

    fixture = TestBed.createComponent(EliminarProceso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
