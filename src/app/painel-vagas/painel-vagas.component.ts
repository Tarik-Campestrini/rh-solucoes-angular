import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Vaga } from '../models/Vagas.model';
import { AlertModelService } from '../shared/alert-model.service';
import { VagasService } from '../vagas.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-painel-vagas',
  templateUrl: './painel-vagas.component.html',
  styleUrls: ['./painel-vagas.component.css'],
})
export class PainelVagasComponent implements OnInit {
  deleteModalRef!: BsModalRef;
  @ViewChild('deleteModal') deleteModal: any;
  vagaSelecionado!: Vaga;
  public vagas: Vaga[] = [];

  constructor(
    private _vagasService: VagasService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private location: Location,
    private modal: AlertModelService
  ) {}

  ngOnInit(): void {
    this.listarVagas();
  }

  listarVagas() {
    this._vagasService.getVagas().subscribe((retornaVaga) => {
      this.vagas = retornaVaga.map((item) => {
        return new Vaga(
          item.id,
          item.nome,
          item.foto,
          item.descricao,
          item.salario
        );
      });
    });
  }

  onEdit(id: any) {
    this.router.navigate(['/editar', id], { relativeTo: this.route });
  }

  onDelete(id: any) {
    this.vagaSelecionado = id;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {
      class: 'modal-sm',
    });
  }

  onConfirmDelete() {
    this._vagasService.removerVaga(this.vagaSelecionado).subscribe(
      (success) => {
        this.modal.showAlertSuccess('Vaga removida com sucesso!');
        this.location.back();
      },
      (erro) =>
        this.modal.showAlertDanger('Erro ao remover vaga, tente novamente!')
    );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }
}
