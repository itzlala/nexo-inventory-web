import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InventarioApiService } from 'src/app/services/inventario-api.service';
import { AddEditInventarioComponent } from '../add-edit-inventario/add-edit-inventario.component';
import { Inventario } from '../interfaces/inventario';

@Component({
  selector: 'app-show-inventario',
  templateUrl: './show-inventario.component.html',
  styleUrls: ['./show-inventario.component.css']
})
export class ShowInventarioComponent implements OnInit, AfterViewInit {
  displayedColumns = ['Folio', 'NomProd', 'Tipo', 'Estatus', 'Marca', 'Lugar', 'Asignacion', 'Costo', 'acciones'];
  dataSource = new MatTableDataSource<Inventario>([]);
  loading = true;
  selectedStatus = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: InventarioApiService, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.dataSource.filterPredicate = (item, filterValue) => {
      const filter = JSON.parse(filterValue || '{}');
      const content = [item.Folio, item.NomProd, item.Tipo, item.Marca, item.Modelo, item.Nserie, item.Lugar, item.Asignacion].join(' ').toLowerCase();
      return (!filter.term || content.includes(filter.term)) && (!filter.status || item.Estatus === filter.status);
    };
  }

  ngOnInit(): void { this.loadInventory(); }
  ngAfterViewInit(): void {
    if (!this.paginator || !this.sort) return;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Activos por página';
  }

  loadInventory(): void {
    this.loading = true;
    this.service.getInventarioList().subscribe({
      next: inventory => { this.dataSource.data = inventory; this.loading = false; },
      error: () => { this.loading = false; this.snackBar.open('No se pudo cargar el inventario.', 'Cerrar', { duration: 4000 }); }
    });
  }

  applySearch(value: string): void { this.applyFilter(value.trim().toLowerCase(), this.selectedStatus); }
  filterStatus(status: string): void { this.selectedStatus = status; this.applyFilter(this.currentTerm, status); }
  get currentTerm(): string { try { return JSON.parse(this.dataSource.filter || '{}').term || ''; } catch { return ''; } }
  get statuses(): string[] { return [...new Set(this.dataSource.data.map(item => item.Estatus).filter(Boolean))].sort(); }

  openDialog(item?: Inventario): void {
    this.dialog.open(AddEditInventarioComponent, { width: '760px', maxWidth: '95vw', data: item ? { ...item } : null }).afterClosed().subscribe(saved => {
      if (saved) this.loadInventory();
    });
  }

  delete(item: Inventario): void {
    if (!confirm(`¿Eliminar el activo ${item.Folio}? Esta acción no se puede deshacer.`)) return;
    this.service.deleteInventario(item.IdInventario).subscribe({
      next: () => { this.snackBar.open('Activo eliminado.', 'Cerrar', { duration: 3000 }); this.loadInventory(); },
      error: () => this.snackBar.open('No se pudo eliminar el activo.', 'Cerrar', { duration: 4000 })
    });
  }

  private applyFilter(term: string, status: string): void {
    this.dataSource.filter = JSON.stringify({ term, status });
    this.dataSource.paginator?.firstPage();
  }
}
