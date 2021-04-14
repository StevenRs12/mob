import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormValidators } from 'src/app/shared/enums/form-validators-enum';
import { AuthService } from 'src/app/shared/services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {
    this.formGroup = this.formBuilder.group({});
    this.initForm();
  }

  ngOnInit(): void {
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      name: '',
      password: ['', [
        Validators.required,
        Validators.minLength(FormValidators.MINPASSWORDLENGTH),
        Validators.maxLength(FormValidators.MAXPASSWORDLENGTH)
      ]]
    });
  }

  loginUser() {

    this.authService.getUserByName(this.formGroup.value).subscribe(data => {
      if (data?.length > 0 &&
        data[0].password == this.formGroup.value.password) {
        sessionStorage.setItem('usuarioSesion', data[0].name);
        sessionStorage.setItem('idUsuarioSesion', data[0].id);
        this.router.navigateByUrl('/home')
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Nombre o clave incorrecta',
        })
      }
    });

  }

}
