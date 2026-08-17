import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InventarioApiService } from 'src/app/services/inventario-api.service';
import { Inventario } from '../interfaces/inventario';

@Component({
  selector: 'app-add-edit-inventario',
  templateUrl: './add-edit-inventario.component.html',
  styleUrls: ['./add-edit-inventario.component.css']
})
export class AddEditInventarioComponent {
  saving = false;
  readonly isEditing = Boolean(this.data?.IdInventario);
  readonly statuses = ['Disponible', 'Asignado', 'En mantenimiento', 'Baja'];
  readonly assetForm = this.formBuilder.group({
    Folio: [this.data?.Folio || '', [Validators.required, Validators.maxLength(40)]],
    NomProd: [this.data?.NomProd || '', [Validators.required, Validators.maxLength(120)]],
    Tipo: [this.data?.Tipo || '', [Validators.required, Validators.maxLength(80)]],
    Estatus: [this.data?.Estatus || 'Disponible', Validators.required],
    Marca: [this.data?.Marca || '', Validators.maxLength(80)],
    Modelo: [this.data?.Modelo || '', Validators.maxLength(80)],
    Nserie: [this.data?.Nserie || '', Validators.maxLength(100)],
    Costo: [this.data?.Costo || '', Validators.required],
    Lugar: [this.data?.Lugar || '', Validators.maxLength(120)],
    Asignacion: [this.data?.Asignacion || '', Validators.maxLength(120)],
    DescFis: [this.data?.DescFis || '', Validators.maxLength(250)],
    DescTec: [this.data?.DescTec || '', Validators.maxLength(250)],
    Observaciones: [this.data?.Observaciones || '', Validators.maxLength(500)]
  });

  constructor(
    private formBuilder: FormBuilder,
    private service: InventarioApiService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddEditInventarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Inventario | null
  ) {}

  save(): void {
    if (this.assetForm.invalid || this.saving) {
      this.assetForm.markAllAsTouched();
      return;
    }

    this.saving = true;
    const asset = {
      IdInventario: this.data?.IdInventario || 0,
      FechaRegistro: this.data?.FechaRegistro || new Date(),
      ...this.assetForm.getRawValue()
    } as Inventario;
    const request = this.isEditing ? this.service.updateInventario(asset) : this.service.addInventario(asset);
    request.subscribe({
      next: () => {
        this.snackBar.open(this.isEditing ? 'Activo actualizado.' : 'Activo registrado.', 'Cerrar', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: () => {
        this.saving = false;
        this.snackBar.open('No fue posible guardar los cambios.', 'Cerrar', { duration: 4000 });
      }
    });
  }
}
