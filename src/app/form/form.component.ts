import { Component } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  private modalReference?: NgbModalRef;

  constructor(
		config: NgbModalConfig,
		private modalService: NgbModal,
	) {
		config.backdrop = 'static';
		config.keyboard = false;
	}

  open(content: any) {
    this.modalReference = this.modalService.open(content, { centered: true });
  }

  close() {
    if (confirm("Deseja sair sem salvar ?")) {
      this.modalReference?.close();
    }
  }

}
