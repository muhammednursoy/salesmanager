import {Injectable} from "@angular/core";
import {SaleRecord, ShoppingBasket} from "./basket";
import {BehaviorSubject, Observable} from "rxjs";
import {Product} from "../../product-catalog/product/product";

@Injectable({
    providedIn: 'root',
})
export class BasketService {

    private basket: ShoppingBasket = new ShoppingBasket();
    private basket$: BehaviorSubject<ShoppingBasket> = new BehaviorSubject(this.basket);

    constructor() {

    }

    getBasket(): Observable<ShoppingBasket> {
        return this.basket$;
    }

    addItem(product: Product) {
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

        this.publishBasket();
    }


    deleteItem(saleRecord: SaleRecord) {
        let index = this.basket.saleRecords.findIndex(item => item == saleRecord);
        if (index < 0) {
            return;
        }
        this.basket.saleRecords.splice(index, 1);
        this.publishBasket();
    }

    isProductInBasket(product: Product): boolean {
        if (!this.basket.saleRecords) {
            return false;
        }
        return this.basket.saleRecords.findIndex(saleRecord => saleRecord.soldProduct.id == product.id) >= 0;
    }

    private publishBasket() {
        this.basket$.next(this.basket);
    }

    replaceBasket(basket: ShoppingBasket) {
        this.basket = Object.assign(new ShoppingBasket(), basket);
        this.basket.id = null;
        this.basket.saleRecords.forEach(record => record.id = null);
        this.publishBasket();
    }

    reset() {
        this.basket = new ShoppingBasket();
        this.publishBasket();
    }



    validateBasket() {
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
