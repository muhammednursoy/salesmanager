import {RestModel} from "../../../common/rest-model";
import {Supplier} from "../supplier/supplier";

export class Product extends RestModel{
    name: string;
    price: number;
    unit: string;
    baseAmount: number;
    description: string;
    disabled: boolean;
    supplier: Supplier;
}

export class PriceRecord extends RestModel{
    product;
    price: number;
    unit: string;
    baseAmount: number;
    unitPrice;
}
