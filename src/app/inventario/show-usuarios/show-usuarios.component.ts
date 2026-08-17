import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuarios } from '../interfaces/usuarios';

@Component({
  selector: 'app-show-usuarios',
  templateUrl: './show-usuarios.component.html',
  styleUrls: ['./show-usuarios.component.css']
})
export class ShowUsuariosComponent implements OnInit, AfterViewInit {
  displayedColumns = ['Nombres', 'DocumentoIdentidad', 'Correo', 'Telefono', 'Ciudad', 'FechaRegistro'];
  dataSource = new MatTableDataSource<Usuarios>([]);
  loading = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: UsuarioService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.service.getUsuarioList().subscribe({
      next: users => { this.dataSource.data = users; this.loading = false; },
      error: () => { this.loading = false; this.snackBar.open('No se pudo cargar el directorio.', 'Cerrar', { duration: 4000 }); }
    });
  }

  ngAfterViewInit(): void {
    if (!this.paginator || !this.sort) return;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Usuarios por página';
  }

  search(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }
}
