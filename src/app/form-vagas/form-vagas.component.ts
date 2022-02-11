import { AlertModelService } from './../shared/alert-model.service';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { VagasService } from './../vagas.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-form-vagas',
  templateUrl: './form-vagas.component.html',
  styleUrls: ['./form-vagas.component.css'],
})
export class FormVagasComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private service: VagasService,
    private location: Location,
    private route: ActivatedRoute,
    private modal: AlertModelService
  ) {}

  ngOnInit(): void {
    const vaga = this.route.snapshot.data['vaga'];

    this.form = this.fb.group({
      id: [vaga.id],
      nome: [
        vaga.nome,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(45),
        ],
      ],
      foto: [
        vaga.foto,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(45),
        ],
      ],
      descricao: [
        vaga.descricao,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(45),
        ],
      ],
      salario: [
        vaga.salario,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      if (this.form.value.id) {
        //upgrade
        this.service.atualizarVaga(this.form.value).subscribe(
          (success) => {
            this.modal.showAlertSuccess('Vaga atualizada com sucesso!');
            this.location.back();
          },
          (error) =>
            this.modal.showAlertDanger(
              'Erro ao cadastrar vaga, tente novamente!'
            )
        );
      } else {
        //novo
        this.service.cadastrarVaga(this.form.value).subscribe(
          (success) => {
            this.modal.showAlertSuccess('Vaga criada com sucesso!');
            this.location.back();
          },
          (error) =>
            this.modal.showAlertDanger(
              'Erro ao cadastrar vaga, tente novamente!'
            )
        );
      }
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }
}
