import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarProceso } from './editar-proceso';

describe('EditarProceso', () => {
  let component: EditarProceso;
  let fixture: ComponentFixture<EditarProceso>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [EditarProceso]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarProceso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
