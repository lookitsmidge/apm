import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailGuard implements CanActivate {
  
constructor(private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot, // current router information
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const id = Number(route.paramMap.get('id'));
    if (isNaN(id) || id < 1) { // if it is not a number or less than 1
      alert('Invalid product id');
      this.router.navigate(['/products']);
      return false;
    }
    return true;
  }
  
}
