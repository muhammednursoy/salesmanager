import {RestModel} from "../../../common/rest-model";

export class Product extends RestModel{
    name: string;
    price: number;
    unit: string;
    baseAmount: number;
    description: string;
    disabled: boolean
}

export class PriceRecord extends RestModel{
    product;
    price: number;
    unit: string;
    baseAmount: number;
    unitPrice;
}