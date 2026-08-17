import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { InventarioApiService } from 'src/app/services/inventario-api.service';
import { Inventario } from '../interfaces/inventario';

@Component({
  selector: 'app-panel-opciones',
  templateUrl: './panel-opciones.component.html',
  styleUrls: ['./panel-opciones.component.css']
})
export class PanelOpcionesComponent implements OnInit {
  loading = true;
  inventory: Inventario[] = [];
  userCount = 0;
  apiUnavailable = false;

  constructor(private service: InventarioApiService) {}

  ngOnInit(): void {
    forkJoin({ inventory: this.service.getInventarioList(), users: this.service.getUsuarioList() }).subscribe({
      next: ({ inventory, users }) => {
        this.inventory = inventory;
        this.userCount = users.length;
        this.loading = false;
      },
      error: () => { this.loading = false; this.apiUnavailable = true; }
    });
  }

  get total(): number { return this.inventory.length; }
  get available(): number { return this.inventory.filter(item => this.status(item) === 'disponible').length; }
  get assigned(): number { return this.inventory.filter(item => this.status(item) === 'asignado').length; }
  get maintenance(): number { return this.inventory.filter(item => this.status(item).includes('mantenimiento')).length; }
  get recent(): Inventario[] { return [...this.inventory].sort((a, b) => +new Date(b.FechaRegistro) - +new Date(a.FechaRegistro)).slice(0, 5); }

  private status(item: Inventario): string { return (item.Estatus || '').trim().toLowerCase(); }
}
