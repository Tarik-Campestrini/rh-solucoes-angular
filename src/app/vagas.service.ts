import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { Vaga } from './models/Vagas.model';

@Injectable({
  providedIn: 'root',
})
export class VagasService {
  private url = 'http://localhost:3000/vagas';

  constructor(private _httpClient: HttpClient) {}

  getVagas(): Observable<Vaga[]> {
    return this._httpClient.get<Vaga[]>(this.url);
  }

  cadastrarVaga(vaga: Vaga): Observable<Vaga[]> {
    return this._httpClient.post<Vaga[]>(this.url, vaga).pipe(take(1));
  }

  atualizarVaga(vaga: Vaga): Observable<Vaga[]> {
    const urlAtualizar = `${this.url}/${vaga.id}`;
    return this._httpClient.put<Vaga[]>(urlAtualizar, vaga).pipe(take(1));
  }

  removerVaga(id: any): Observable<Vaga[]> {
    const urlDeletar = `${this.url}/${id}`;
    return this._httpClient.delete<Vaga[]>(urlDeletar).pipe(take(1));
  }

  carregarPeloId(id: any) {
    return this._httpClient.get<Vaga>(`${this.url}/${id}`).pipe(take(1));
  }
}
