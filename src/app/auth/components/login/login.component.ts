import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import FormsUtils from 'src/app/shared/utils/forms.util';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  loginError = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastrService: NbToastrService
  ) {
    this.formLogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      rememberUser: [false]
    });
  }

  ngOnInit(): void {
  }

  onLogin(): void {
    console.log(this.formLogin.value);

    FormsUtils.markAllControlsAsDirty(Object.values(this.formLogin.controls));

    if(this.formLogin.valid) {
      this.authService.login(this.formLogin.value)
      .catch((error) => {
        this.loginError = error.message;
        this.toastrService.danger(error.message, 'Erro');
      });
    }
  }

  onRegister(): void {
    this.authService.openRegister();
  }

  getErroMessage(control: AbstractControl | null): string {
    return !!control?.errors ? 'Campo obrigatório' : '';
  }

  getStatusInput(control: AbstractControl | null): string {
    return !this.loginError && (!control?.dirty || control?.valid) ? 'basic' : 'danger';
  }

  showErrosInput(control: AbstractControl | null): boolean {
    return !!control?.dirty && !control?.valid;
  }

}
