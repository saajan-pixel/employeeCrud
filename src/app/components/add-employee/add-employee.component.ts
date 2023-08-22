import { NgxSpinnerService } from 'ngx-spinner';
import { first, finalize } from 'rxjs';
import { EmployeeService } from './../../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  form!: FormGroup;
  id!: number;
  constructor(
    private fb: FormBuilder,
    private _employeeService: EmployeeService,
    private location: Location,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr:ToastrService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.createForm();
    if (this.id) {
      this.spinner.show();
      this._employeeService
        .getEmployeeById(this.id)
        .pipe(
          first(),
          finalize(() => this.spinner.hide())
        )
        .subscribe({
          next: (res) => {
            this.createForm(res);
          },
          error: (error) => {
            throw error;
          },
        });
    }
  }

  createForm(item: any = {}) {
    this.form = this.fb.group({
      id: [item.id ? item.id : 0],
      firstName: [item.firstName ? item.firstName : '', Validators.required],
      lastName: [item.lastName ? item.lastName : '', Validators.required],
      email: [
        item.email ? item.email : '',
        [Validators.required, Validators.email],
      ],
      address:[item.address ? item.address:''],
      designation:[item.designation ? item.designation:''],
      gender: [item.gender ? item.gender : 'default', Validators.required],
    });
  }

  saveEmployee() {
    if (this.form.valid) {
      this.spinner.show();
      this._employeeService
        .addEmployee(this.form.value)
        .pipe(
          first(),
          finalize(() => this.spinner.hide())
        )
        .subscribe({
          next: (res) => {
            this.toastr.success("Saved Successfully")
            this.navigate()
          },
          error: (error) => {
            throw error;
          },
        });
    }
  }

  navigate(){
    this.router.navigateByUrl('/employeelist')
  }

  updateEmployee() {
    if (this.form.valid) {
      this._employeeService
        .updateEmployee(this.form.value, this.id)
        .pipe(
          first(),
          finalize(() => this.spinner.hide())
        )
        .subscribe({
          next: (res) => {
            this.toastr.success('Updated Successfully')
            this.navigate()
          },
          error: (error) => {
            throw error;
          },
        });
    }
  }

  goBack() {
    this.location.back();
  }
}
