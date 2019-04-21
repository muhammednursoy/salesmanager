import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from "./auth.service";
import {catchError, flatMap, switchMap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {

    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return this.authService.loggedIn().pipe(switchMap(response => {
            console.log("next")
            if (response != null) {
                return of(true)
            }
            this.router.navigate(['login']);
            return of(false);
        }), catchError(() => {
            console.log("catchError")
            this.router.navigate(['login']);
            return of(false);
        }))
    }

}
