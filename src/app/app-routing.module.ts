import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { RouteGuard } from 'src/guard/route.guard';

const routes: Routes = [
  { path: '', redirectTo: 'employeelist', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  {
    path: 'employeelist',
    component: EmployeeListComponent,
    canActivate: [RouteGuard],
  },
  {
    path: 'employeelist/add',
    component: AddEmployeeComponent,
    canActivate: [RouteGuard],
  },
  {
    path: 'employeelist/edit/:id',
    component: AddEmployeeComponent,
    canActivate: [RouteGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
