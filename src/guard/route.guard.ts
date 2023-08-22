import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/services/employee.service';


@Injectable({
  providedIn: 'root',
})
export class RouteGuard implements CanActivate {
  constructor(private _authService: EmployeeService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem('user')) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
