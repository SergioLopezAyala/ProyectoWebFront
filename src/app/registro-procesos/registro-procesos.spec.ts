import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroProcesos } from './registro-procesos';

describe('RegistroProcesos', () => {
  let component: RegistroProcesos;
  let fixture: ComponentFixture<RegistroProcesos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroProcesos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroProcesos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
