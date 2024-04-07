import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthGuardService, private router: Router) { }

  canActivate(): boolean{
    const isLoggedIn = !!localStorage.getItem('authToken');
    if(isLoggedIn){
      return true;
    }else{
      this.router.navigate(['/login'])
      return false
    }
  }


}
