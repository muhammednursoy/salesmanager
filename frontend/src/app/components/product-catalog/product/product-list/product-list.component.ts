import {Component, OnInit} from "@angular/core";
import {ProductService} from "../product.service";
import {Product} from "../product";
import {PageRequest} from "../../../../common/page-request";
import {merge, Observable, of} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-category-list',
    templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
    pageRequest: PageRequest = {page: 0, size: 10};
    products$: Observable<Array<Product>>;
    form: FormGroup;

    constructor(public productService: ProductService, public fb: FormBuilder) {

    }

    ngOnInit(): void {
        this.form = this.fb.group({searchInput: ""});
        this.products$ = merge(of(""), this.form.get("searchInput").valueChanges).pipe(
            debounceTime(100),
            distinctUntilChanged(),
            switchMap((name: string) => this.productService.searchProducts(name, this.pageRequest)));
    }
}
