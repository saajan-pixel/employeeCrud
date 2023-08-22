import { EmployeeService } from './../../../services/employee.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { finalize, first } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/Interface/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  @ViewChild('closeModal', { read: ElementRef })
  closeModalRef!: ElementRef<HTMLButtonElement>;
  employees!: Employee[];
  cloneEmployees: Employee[]=[];
  employeeId!: number;

  constructor(
    private _employeeService: EmployeeService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee() {
    this.spinner.show();
    this._employeeService
      .getEmployee()
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      )
      .subscribe({
        next: (res:Employee[]) => {
          this.employees = res;
          this.cloneEmployees = res;
        },
        error: (error) => {
          throw error;
        },
      });
  }

  deleteEmployee(id: number) {
    this.spinner.show();
    this._employeeService
      .deleteEmployee(id)
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      )
      .subscribe({
        next: () => {
          this.toastr.success('Successfully Deleted');
          this.closeModalRef.nativeElement.click();
          this.getEmployee();
        },
        error: (error) => {
          throw error;
        },
      });
  }

  searchList(searchTerm: HTMLInputElement) {
    if (searchTerm.value === '') {
      this.employees = this.cloneEmployees;
    } else {
      this.employees = this.cloneEmployees.filter((item:Employee) => {
      return  item.firstName
          .toLowerCase()
          .includes(searchTerm.value.toLowerCase()) ||
          item.lastName
            .toLowerCase()
            .includes(searchTerm.value.toLowerCase()) ||
          item.email
            .toLowerCase()
            .includes(searchTerm.value.toLowerCase());
      });
    }
  }
}
