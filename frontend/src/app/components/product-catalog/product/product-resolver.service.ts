import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, mergeMap, take} from 'rxjs/operators';
import {Product} from "./product";
import {ProductService} from "./product.service";

@Injectable({
    providedIn: 'root',
})
export class ProductResolverService implements Resolve<Product> {
    constructor(private productService: ProductService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
        let id = route.paramMap.get('id');

        return this.productService.getProduct(id).pipe(
            catchError(err => {
                this.router.navigate(['/products']);
                return EMPTY;
            }),
            take(1),
            mergeMap(product => {
                if (product) {
                    return of(product);
                } else { // id not found
                    this.router.navigate(['/products']);
                    return EMPTY;
                }
            })
        );
    }
}
