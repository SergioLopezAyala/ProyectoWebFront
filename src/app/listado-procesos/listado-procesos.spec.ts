import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoProcesos } from './listado-procesos';

describe('ListadoProcesos', () => {
  let component: ListadoProcesos;
  let fixture: ComponentFixture<ListadoProcesos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoProcesos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoProcesos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
