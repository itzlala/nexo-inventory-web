import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuarios } from '../inventario/interfaces/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  readonly inventarioAPIUrl = environment.apiUrl;

  constructor(
    public http: HttpClient
  ) { }
  // metodos para los usuarios

    getUsuarioList():Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(this.inventarioAPIUrl + '/Usuario');
    }

    addUsuario(data:any){
    return this.http.post(this.inventarioAPIUrl + '/Usuario', data);
    }

    updateUsuario(data: Usuarios) {
    return this.http.put(this.inventarioAPIUrl + '/Usuario', data);
    }

    deleteUsuario(id:number|string) {
    return this.http.delete(this.inventarioAPIUrl + `/Usuario/${id}`);
    }
}
