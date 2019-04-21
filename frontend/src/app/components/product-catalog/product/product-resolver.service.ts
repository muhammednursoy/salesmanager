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
                console.log("ERROR", err);
                this.router.navigate(['/products']);
                return EMPTY;
            }),
            take(1),
            mergeMap(product => {
                if (product) {
                    console.log("TEST!",product);
                    console.log(product instanceof Product);
                    return of(product);
                } else { // id not found
                    console.log(" id not found TEST!",product);
                    this.router.navigate(['/products']);
                    return EMPTY;
                }
            })
        );
    }
}
