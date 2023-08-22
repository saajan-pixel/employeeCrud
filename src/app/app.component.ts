import { first } from 'rxjs';
import { Component } from '@angular/core';
import { EmployeeService } from 'src/services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'employeeCRUD';
  isLoggedIn = false;

  constructor(private _employeeService: EmployeeService) {
    if(localStorage.getItem('user')){
      this.isLoggedIn=true
    }
  }

}
