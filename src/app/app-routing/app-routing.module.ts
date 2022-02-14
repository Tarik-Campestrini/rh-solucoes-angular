import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormVagasComponent } from '../form-vagas/form-vagas.component';
import { MuralVagasComponent } from '../mural-vagas/mural-vagas.component';
import { PainelVagasComponent } from '../painel-vagas/painel-vagas.component';
import { VagaResolverGuard } from './../guards/vaga-resolver.guard';

const rotas: Routes = [
  { path: 'mural', component: MuralVagasComponent },
  { path: 'painel', component: PainelVagasComponent },
  {
    path: 'novo',
    component: FormVagasComponent,
    resolve: {
      vaga: VagaResolverGuard,
    },
  },
  {
    path: 'editar/:id',
    component: FormVagasComponent,
    resolve: {
      vaga: VagaResolverGuard,
    },
  },
  { path: '', redirectTo: '/mural', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(rotas)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
