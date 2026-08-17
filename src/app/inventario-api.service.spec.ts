import { TestBed } from '@angular/core/testing';

import { InventarioApiService } from './services/inventario-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InventarioApiService', () => {
  let service: InventarioApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(InventarioApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
