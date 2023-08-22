import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from 'src/Interface/employee';
import { User } from 'src/Interface/user';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  apiUrl = 'https://jsontodo.onrender.com'

  constructor(private http: HttpClient) {}

  getEmployee(){
    return this.http.get<Employee[]>(`${this.apiUrl}/employees`);
  }

  getEmployeeById(id: number) {
    return this.http.get<Employee>(`${this.apiUrl}/employees/${id}`);
  }

  addEmployee(data: Employee) {
    return this.http.post<Employee>(`${this.apiUrl}/employees`, data);
  }

  updateEmployee(data: Employee, id: number) {
    return this.http.put<Employee>(`${this.apiUrl}/employees/${id}`, data);
  }

  deleteEmployee(id: number) {
    return this.http.delete<Employee>(`${this.apiUrl}/employees/${id}`);
  }

  getUser(id:number){
    return this.http.get<User>(`${this.apiUrl}/users/${id}`)
  }

}
