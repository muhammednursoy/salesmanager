import {Component, OnInit} from "@angular/core";
import {ProductService} from "../product.service";
import {Product} from "../product";
import {PageRequest, SEARCH_DUE_TIME} from "../../../../common/page-request";
import {merge, Observable, of, Subject} from "rxjs";
import {debounceTime, delay, distinctUntilChanged, mergeMap, switchMap, tap} from "rxjs/operators";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
    PAGE_SIZE = 30;
    pageRequest: PageRequest = {page: 0, size: this.PAGE_SIZE};
    products$: Observable<Array<Product>>;
    products: Array<Product>;
    disableProduct$: Subject<any> = new Subject();
    form: FormGroup;
    showDisabledProducts: boolean = false;
    throttle: number = 300;
    scrollDistance: number = 1;

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
            tap(() => this.clearPageRequest()),
            switchMap((name: string) => this.getSearchProductsObservable(name))
        );
        this.products$.subscribe(productList => this.products = productList);
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

    onScrollDown() {
        this.pageRequest.page += 1;
        this.productService.searchProducts(this.form.get("searchInput").value, this.form.get("showDisabledProducts").value, this.pageRequest).subscribe(appendProductsList => {
            this.products.push(...appendProductsList)
        })
    }

    private getSearchProductsObservable(name: string) {
        return this.productService.searchProducts(name, this.form.get("showDisabledProducts").value, {page: 0, size: this.PAGE_SIZE});
    }

    private clearPageRequest() {
        this.pageRequest = {page: 0, size: this.PAGE_SIZE};
    }
}
