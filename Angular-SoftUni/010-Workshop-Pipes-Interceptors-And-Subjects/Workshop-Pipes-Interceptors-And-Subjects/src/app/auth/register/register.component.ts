import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/service/auth.service';
import {CreateUserDto} from 'src/app/core/user.service';
import {emailValidator, passwordMatch} from '../util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  passwordControl = new FormControl(null, [Validators.required, Validators.minLength(5)]);
  registerFormGroup: FormGroup = this.formBuilder.group({
    'username': new FormControl(null, [Validators.required, Validators.minLength(5)]),
    'email': new FormControl(null, [Validators.required, emailValidator]),
    'passwords': new FormGroup({
      'password': this.passwordControl,
      'rePassword': new FormControl(null, [passwordMatch(this.passwordControl)]),
    }),
    'tel': new FormControl(''),
    'telRegion': new FormControl(''),
  })

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  get passwordsGroup(): FormGroup {
    return this.registerFormGroup.controls['passwords'] as FormGroup;
  }

  ngOnInit(): void {
  }

  shouldShowErrorForControl(controlName: string, sourceGroup: FormGroup = this.registerFormGroup) {
    return sourceGroup.controls[controlName].touched && sourceGroup.controls[controlName].invalid;
  }

  handleRegister(): void {
    const {username, email, passwords, tel, telRegion} = this.registerFormGroup.value;

    const body: CreateUserDto = {
      username: username,
      email: email,
      password: passwords.password,
      // ...(!!tel && { tel: telRegion + tel })
    }

    if (tel) {
      body.tel = telRegion + tel;
    }

    // send body to Back-end
    this.authService.register$(body).subscribe(() => {
      this.router.navigate(['/home']);
    })
  }
}
