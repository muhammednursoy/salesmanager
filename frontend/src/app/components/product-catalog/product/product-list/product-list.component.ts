import {Component, OnInit} from "@angular/core";
import {ProductService} from "../product.service";
import {Product} from "../product";
import {PageRequest, SEARCH_DUE_TIME} from "../../../../common/page-request";
import {merge, Observable, of, Subject} from "rxjs";
import {debounceTime, delay, distinctUntilChanged, mergeMap, switchMap} from "rxjs/operators";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-category-list',
    templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
    pageRequest: PageRequest = {page: 0, size: 10};
    products$: Observable<Array<Product>>;
    disableProduct$: Subject<any> = new Subject();
    form: FormGroup;
    showDisabledProducts: boolean = false;

    constructor(public productService: ProductService, public fb: FormBuilder) {

    }

    ngOnInit(): void {
        this.form = this.fb.group({searchInput: "", showDisabledProducts: false});
        let searchProductsInput$ = this.form.get("searchInput").valueChanges.pipe(distinctUntilChanged());
        let disableProductsInput$ = this.form.get("showDisabledProducts").valueChanges.pipe(switchMap(() => of(this.form.get("searchInput").value)));
        this.products$ = merge(
            of(""),
            searchProductsInput$,
            disableProductsInput$,
            this.disableProduct$.pipe(delay(1500),mergeMap(() => of(this.form.get("searchInput").value)))
        ).pipe(
            debounceTime(SEARCH_DUE_TIME),
            switchMap((name: string) => this.getSearchProductsObservable(name))
        );
    }

    disableProduct(product: Product) {
        this.productService.disableProduct(product.id).subscribe(() => {
            this.disableProduct$.next();
            return product.disabled = true;
        })
    }

    enableProduct(product: Product) {
        this.productService.enableProduct(product.id).subscribe(() => {
            return product.disabled = false;
        })
    }

    private getSearchProductsObservable(name: string) {
        return this.productService.searchProducts(name, this.form.get("showDisabledProducts").value, this.pageRequest);
    }
}
