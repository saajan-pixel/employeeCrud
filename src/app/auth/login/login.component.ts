import { Router } from '@angular/router';
import { first } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/Interface/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  user!: User;
  invalidPassword = false;
  constructor(
    private fb: FormBuilder,
    private _employeeService: EmployeeService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getUser();
    if(localStorage.getItem('user')){
      this.router.navigateByUrl('/')
    }
  }

  getUser() {
    this._employeeService
      .getUser(1)
      .pipe(first())
      .subscribe((res: User) => {
        this.user = res;
      });
  }



  createForm() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    if (
      this.user.email === this.loginForm.value.email &&
      this.user.password === this.loginForm.value.password
    ) {
      localStorage.setItem('user', JSON.stringify(this.loginForm.value));
      this.loginForm.reset();
      this.router.navigateByUrl('/employeelist');
    } else {
      this.toastr.error('Invalid Credentials');
    }
  }

  checkPasswordValidation(password: HTMLInputElement) {
    if (password.value && password.value !== this.user.password) {
      this.invalidPassword = true;
    } else {
      this.invalidPassword = false;
    }
  }
}
