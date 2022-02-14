import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { VagasService } from '../vagas.service';
import { Vaga } from './../models/Vagas.model';

@Injectable({
  providedIn: 'root',
})
export class VagaResolverGuard implements Resolve<Vaga> {
  constructor(private service: VagasService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Vaga> {
    if (route.params && route.params['id']) {
      return this.service.carregarPeloId(route.params['id']);
    }

    return of({
      id: null,
      nome: null,
      foto: null,
      descricao: null,
      salario: null,
    });
  }
}
