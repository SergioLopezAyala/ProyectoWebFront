import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroDeEmpresa } from './registro-de-empresa';

describe('RegistroDeEmpresa', () => {
  let component: RegistroDeEmpresa;
  let fixture: ComponentFixture<RegistroDeEmpresa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroDeEmpresa]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroDeEmpresa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
