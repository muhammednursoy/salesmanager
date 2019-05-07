import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, mergeMap, take} from 'rxjs/operators';
import {Supplier} from "./supplier";
import {SupplierService} from "./supplier.service";

@Injectable({
    providedIn: 'root',
})
export class SupplierResolverService implements Resolve<Supplier> {
    constructor(private supplierService: SupplierService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Supplier> {
        let id = route.paramMap.get('id');

        return this.supplierService.getSupplier(id).pipe(
            catchError(err => {
                this.router.navigate(['/suppliers']);
                return EMPTY;
            }),
            take(1),
            mergeMap(supplier => {
                if (supplier) {
                    return of(supplier);
                } else { // id not found
                    this.router.navigate(['/suppliers']);
                    return EMPTY;
                }
            })
        );
    }
}
