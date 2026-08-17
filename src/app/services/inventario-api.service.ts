import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventario } from '../inventario/interfaces/inventario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventarioApiService {
  
  readonly inventarioAPIUrl = environment.apiUrl;
  
  constructor(private http:HttpClient) {
  
  }
  // metodos del inventario

  getInventarioList():Observable<Inventario[]> {
  return this.http.get<Inventario[]>(this.inventarioAPIUrl + '/Inventario');
  }

  addInventario(data:any){
  return this.http.post(this.inventarioAPIUrl + '/Inventario', data);
  }

  updateInventario(data: Inventario) {
  return this.http.put(this.inventarioAPIUrl + '/Inventario', data);
  }

  deleteInventario(id:number|string) {
  return this.http.delete(this.inventarioAPIUrl + `/Inventario/${id}`);
  }

  // metodos para los usuarios

  getUsuarioList():Observable<any[]> {
  return this.http.get<any>(this.inventarioAPIUrl + '/Usuario');
  }

  addUsuario(data:any){
  return this.http.post(this.inventarioAPIUrl + '/Usuario', data);
  }

  updateUsuario(id:number|string, data:any) {
  return this.http.put(this.inventarioAPIUrl + `/Usuario/${id}`, data);
  }

  deleteUsuario(id:number|string) {
  return this.http.delete(this.inventarioAPIUrl + `/Usuario/${id}`);
  }

  // Estados

  getEstadoList():Observable<any[]> {
  return this.http.get<any>(this.inventarioAPIUrl + '/Estado');
  }

  addEstado(data:any){
  return this.http.post(this.inventarioAPIUrl + '/Estado', data);
  }

  updateEstado(id:number|string, data:any) {
  return this.http.put(this.inventarioAPIUrl + `/Estado/${id}`, data);
  }

  deleteEstado(id:number|string) {
  return this.http.delete(this.inventarioAPIUrl + `/Estado/${id}`);
  }
}
