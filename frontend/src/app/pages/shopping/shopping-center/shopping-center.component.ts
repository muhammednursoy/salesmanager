import {Component, OnInit} from "@angular/core";
import {merge, Observable, of} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs/operators";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PageRequest, SEARCH_DUE_TIME} from "../../../common/page-request";
import {Product} from "../../product-catalog/product/product";
import {SaleRecord, ShoppingBasket} from "../basket";
import {ProductService} from "../../product-catalog/product/product.service";
import {UnitPriceConverterService} from "../../../common/unit-price-converter.service";
import {ShoppingService} from "../shopping.service";
import {BasketService} from "../basket.service";

@Component({
    selector: 'app-shopping-center',
    templateUrl: './shopping-center.component.html',
    styles: ['.btn-link { color: brown !important;}']
})
export class ShoppingCenterComponent implements OnInit {
    PAGE_SIZE: number = 20;
    pageRequest: PageRequest = {page: 0, size: this.PAGE_SIZE};
    products$: Observable<Array<Product>>;
    products: Product[] = [];
    form: FormGroup;
    basket: ShoppingBasket = new ShoppingBasket();
    showShoppingHistory: boolean;
    submitted: boolean;
    throttle: number = 300;
    scrollDistance: number = 1;

    constructor(public productService: ProductService,
                public shoppingService: ShoppingService,
                public fb: FormBuilder,
                public priceConverter: UnitPriceConverterService,
                public basketService: BasketService) {

    }

    ngOnInit(): void {
        this.basketService.getBasket().subscribe(basket => this.basket = basket);
        this.form = this.fb.group({searchInput: ""});
        this.products$ = merge(of(""), this.form.get("searchInput").valueChanges).pipe(
            debounceTime(SEARCH_DUE_TIME),
            distinctUntilChanged(),
            tap(() => this.clearPageRequest()),
            switchMap((name: string) => this.productService.searchEnabledProducts(name, this.pageRequest)));
        this.products$.subscribe(productList => this.products = productList)
    }

    addToBasket(product: Product) {
        this.basketService.addItem(product);
    }

    deleteFromBasket(saleRecord: SaleRecord) {
        this.basketService.deleteItem(saleRecord)
    }

    get totalPrice() {
        let totalPrice = 0;
        this.basket.saleRecords.forEach(record => totalPrice += record.collectedCash);
        if (totalPrice) {
            return parseFloat(totalPrice.toFixed(2));
        }
        return 0;
    }

    saveSaleRecord() {
        this.submitted = true;
        if (this.isBasketInvalid()) {
            return;
        }

        this.shoppingService.save(this.basket).subscribe(response => {
            this.basketService.reset();
        });

    }

    isBasketInvalid(): boolean {
        return !this.basketService.validateBasket()
    }

    openShoppingHistory() {
        this.showShoppingHistory = true;
    }

    resetBasket() {
        this.basketService.reset();
    }

    isProductInBasket(product: Product) {
        return this.basketService.isProductInBasket(product);
    }

    onScrollDown() {
        this.pageRequest.page += 1;
        this.productService.searchEnabledProducts(this.form.get("searchInput").value, this.pageRequest).subscribe(appendProductsList => {
            this.products.push(...appendProductsList)
        })
    }

    private clearPageRequest() {
        this.pageRequest = {page: 0, size: this.PAGE_SIZE};
    }
}
