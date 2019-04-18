import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PageRequest} from "../../../common/page-request";
import {Product} from "../../../product-catalog/product/product";
import {SaleRecord, ShoppingBasket} from "../basket";
import {ProductService} from "../../../product-catalog/product/product.service";
import {UnitPriceConverterService} from "../../../common/unit-price-converter.service";
import {ShoppingService} from "../shopping.service";

@Component({
    selector: 'app-category-list',
    templateUrl: './shopping-center.component.html',
})
export class ShoppingCenterComponent implements OnInit {
    pageRequest: PageRequest = {page: 0, size: 10};
    products$: Observable<Array<Product>>;
    form: FormGroup;
    basket: ShoppingBasket = new ShoppingBasket();

    constructor(public productService: ProductService,
                public shoppingService: ShoppingService,
                public fb: FormBuilder,
                public priceConverter: UnitPriceConverterService) {

    }

    ngOnInit(): void {
        this.form = this.fb.group({searchInput: ""});
        this.products$ = this.form.get("searchInput").valueChanges.pipe(
            debounceTime(100),
            distinctUntilChanged(),
            switchMap((name: string) => this.productService.searchProducts(name, this.pageRequest)));
    }

    addToBasket(product: Product) {
        if (this.isProductInBasket(product)) {
            return;
        }
        let saleRecord: SaleRecord;
        saleRecord = new SaleRecord();
        saleRecord.soldProduct = product;
        saleRecord.unit = product.unit;
        saleRecord.unitAmount = product.unitAmount;
        saleRecord.price = product.price;
        this.basket.saleRecords.push(saleRecord)
    }

    deleteFromBasket(saleRecord: SaleRecord) {
        let index = this.basket.saleRecords.findIndex(item => item == saleRecord);
        if (index < 0) {
            return;
        }
        this.basket.saleRecords.splice(index, 1);
    }

    isProductInBasket(product: Product): boolean {
        if (!this.basket.saleRecords) {
            return false;
        }
        return this.basket.saleRecords.findIndex(saleRecord => saleRecord.soldProduct.id == product.id) >= 0;
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
        let isBasketInvalid = !this.validateBasket();

        if (isBasketInvalid) {
            return;
        }

        this.shoppingService.save(this.basket).subscribe(response => {
            this.basket = new ShoppingBasket();
        });

    }

    private validateBasket() {
        let valid = true;
        this.basket.saleRecords.forEach(record => {
            if (record.amount) {
                return;
            }
            valid = false;
        });
        return valid
    }
}
