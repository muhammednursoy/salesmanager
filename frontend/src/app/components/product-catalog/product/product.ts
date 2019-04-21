import {RestModel} from "../../../common/rest-model";

export class Product extends RestModel{
    name: string;
    price: number;
    unit: string;
    unitAmount: number;
    description: string;
}
