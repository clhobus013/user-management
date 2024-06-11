import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig, NgbModalRef, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form!: FormGroup;
  send: boolean = false;

  private modalReference?: NgbModalRef;

  accessProfiles: any[] = [
    { id: 1, description: "Supervisor" },
    { id: 2, description: "Analista" },
  ]

  languages: any[] = [
    { id: 1, description: "Português BR" },
    { id: 2, description: "Espanhol" },
  ]

  contacts: any[] = [
    { id: 1, description: "E-mail" },
    { id: 2, description: "Telefone" },
    { id: 3, description: "Todos" },
  ]

  constructor(
    private config: NgbModalConfig,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.form = this.formBuilder.group({
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      phone: [null],
      email: [null, [Validators.required, Validators.email]],
      access_profile: [null, [Validators.required]],
      language: [1, [Validators.required]],
      preferred_contact: [null],
      status: [1, { disabled: true }],
      creation_date: [this.getCurrentDate(), { disabled: true }],
    });
  }

  private getCurrentDate(): string {
    return new Date().toLocaleDateString();
  }

  public isFieldValid(field: string) {
    if (this.form.get(field)?.touched || this.send) {
      if (!this.form.get(field)?.valid) {
        return false;
      }
    }

    return true;
  }

  public displayFieldCss(field: string) {
    return {
      'invalid-feedback': !this.isFieldValid(field),
      'valid-feedback': this.isFieldValid(field)
    };
  }

  open(content: any) {
    this.modalReference = this.modalService.open(content, { centered: true, size: 'lg' });
  }

  close(needConfirm: boolean = true) {

    if (needConfirm && !confirm("Deseja sair sem salvar ?")) {
      return
    }

    this.send = false;
    this.form.reset();
    this.modalReference?.close();
  }

  public save(popover: NgbPopover) {

    this.send = true;

    if (!this.form.valid) {
      popover.open();
      return;
    }

    this.userService.postUser(this.form.value)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.close(false);
        },
        error: (error: any) => {
          console.log(error);
        }
      });
  }
}
