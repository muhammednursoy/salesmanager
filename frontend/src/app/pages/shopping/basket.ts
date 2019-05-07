import {RestModel} from "../../common/rest-model";
import {Product} from "../product-catalog/product/product";

export class ProductPrice {
    price: number;
    unit: string;
    baseAmount: number;
}

export class SaleRecord extends RestModel {
    saleAmount: number;
    soldProduct: Product;
    collectedCash: number = 0;
    price: number;
    unit: string;
    baseAmount: number;

    get getPrice(): ProductPrice {
        return {price: this.price, unit: this.unit, baseAmount: this.baseAmount}
    }

}

export class Customer extends RestModel {
    email: string;
}

export class ShoppingBasket extends RestModel {
    saleRecords: SaleRecord[] = [];
    customer: Customer;
    totalPrice: number = 0;
    disabled: boolean = false;
}
