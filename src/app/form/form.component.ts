import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user.service';
import { Status } from '../models/status';
import { GenericService } from '../services/generic.service';
import { Generic } from '../models/Generic';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form!: FormGroup;

  send: boolean = false;
  showToast: boolean = false;

  accessProfiles: Generic[] = [];
  languages: Generic[] = [];
  contacts: Generic[] = [];

  private modalReference?: NgbModalRef;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private genericService: GenericService
  ) {
  }

  ngOnInit() {
    this.getGenerics();
    this.initializeForm();
  }

  private getGenerics() {
    this.genericService.getLanguages().subscribe({
      next: (data: any) => this.languages = data
    }
    );

    this.genericService.getContacts().subscribe({
      next: (data: any) => this.contacts = data
    }
    );

    this.genericService.getAccessProfiles().subscribe({
      next: (data: any) => this.accessProfiles = data
    }
    );
  }

  private initializeForm() {

    let status: Status = {
      "id": 2,
      "description": "Pendente",
      "color": "warning"
    }

    this.form = this.formBuilder.group({
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      phone: [null],
      email: [null, [Validators.required, Validators.email]],
      access_profile: [null, [Validators.required]],
      language: [1, [Validators.required]],
      preferred_contact: [null],
      status: [status, { disabled: true }],
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
    setTimeout(() => {
      this.showToast = false;
    }, 1500)
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
          this.showToast = true;
          this.close(false);
        },
        error: (error: any) => {
        }
      });
  }
}
