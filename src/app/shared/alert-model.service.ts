import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

export enum AlertTypes {
  Danger = 'danger',
  Success = 'success'
}

@Injectable({
  providedIn: 'root',
})
export class AlertModelService {
  constructor(private modalService: BsModalService) {}

  private showAlert(message: string, type: AlertTypes, dismissTimeout?: number) {
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;

    if(dismissTimeout){
      setTimeout(() => bsModalRef.hide(), dismissTimeout);
    }

  }

  showAlertDanger(message: string) {
    this.showAlert(message, AlertTypes.Danger);
  }

  showAlertSuccess(message: string) {
    this.showAlert(message, AlertTypes.Success, 5000);
  }
}
