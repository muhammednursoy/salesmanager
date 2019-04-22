import {RestModel} from "../../../common/rest-model";
import {Product} from "../../product-catalog/product/product";

export class ProductPrice {
    price: number;
    unit: string;
    unitAmount: number;
}

export class SaleRecord extends RestModel {
    amount: number;
    soldProduct: Product;
    collectedCash: number = 0;
    price: number;
    unit: string;
    unitAmount: number;

    get getPrice(): ProductPrice {
        return {price: this.price, unit: this.unit, unitAmount: this.unitAmount}
    }

}

export class Customer extends RestModel {
    email: string;
}

export class ShoppingBasket extends RestModel {
    saleRecords: SaleRecord[] = [];
    customer: Customer;
    totalPrice: number;
}
