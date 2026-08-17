import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { InventarioApiService } from 'src/app/services/inventario-api.service';

import { PanelOpcionesComponent } from './panel-opciones.component';

describe('PanelOpcionesComponent', () => {
  let component: PanelOpcionesComponent;
  let fixture: ComponentFixture<PanelOpcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelOpcionesComponent ],
      providers: [{ provide: InventarioApiService, useValue: { getInventarioList: () => of([]), getUsuarioList: () => of([]) } }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelOpcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
