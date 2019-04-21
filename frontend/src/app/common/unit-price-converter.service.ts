import {Injectable} from "@angular/core";
import {ProductPrice, SaleRecord} from "../components/sales/shopping/basket";
import {UNITS} from "./unit";

@Injectable({
    providedIn: 'root',
})
export class UnitPriceConverterService {

    public calculatePrice(saleRecord: SaleRecord) {
        saleRecord.collectedCash = this.getPrice(saleRecord.amount, saleRecord.unit, saleRecord.soldProduct);
    }

    public getPrice(amount: number, unit: string, productPrice: ProductPrice) {
        let basePrice = this.getBasePrice(unit, productPrice);
        if (basePrice == null) {
            throw new Error("basePrice cannot be null !!")
        }
        let result = basePrice.price * (amount / basePrice.unitAmount);
        return parseFloat(result.toFixed(2));
    }

    public getBasePrice(unit: string, productPrice: ProductPrice): ProductPrice {
        if (unit == UNITS.BY_PIECE.enumValue && productPrice.unit == UNITS.BY_PIECE.enumValue) {
            return productPrice;
        }

        if (unit == UNITS.KG.enumValue) {
            if (productPrice.unit == UNITS.KG.enumValue) {
                return productPrice;
            }
            if (productPrice.unit == UNITS.GR.enumValue) {
                let basePrice = Object.assign({}, productPrice);
                basePrice.unitAmount = basePrice.unitAmount / 1000;
                return basePrice;
            }
        }

        if (unit == UNITS.GR.enumValue) {
            if (productPrice.unit == UNITS.KG.enumValue) {
                let basePrice = Object.assign({}, productPrice);
                basePrice.unitAmount = basePrice.unitAmount * 1000;
                return basePrice;
            }
            if (productPrice.unit == UNITS.GR.enumValue) {
                return productPrice;
            }
        }

        if (unit == UNITS.LT.enumValue) {
            if (productPrice.unit == UNITS.LT.enumValue) {
                return productPrice;
            }
            if (productPrice.unit == UNITS.ML.enumValue) {
                let basePrice = Object.assign({}, productPrice);
                basePrice.unitAmount = basePrice.unitAmount / 1000;
                return basePrice;
            }
        }

        if (unit == UNITS.ML.enumValue) {
            if (productPrice.unit == UNITS.LT.enumValue) {
                let basePrice = Object.assign({}, productPrice);
                basePrice.unitAmount = basePrice.unitAmount * 1000;
                return basePrice;
            }
            if (productPrice.unit == UNITS.ML.enumValue) {
                return productPrice;
            }
        }

        return null;
    }
}
