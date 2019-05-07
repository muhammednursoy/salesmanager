import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PriceRecord, Product} from "./product";

@Injectable({
    providedIn: 'root',
})
export class ProductPriceHistoryService {

    constructor(private http: HttpClient) {

    }

    getPriceHistory(productId: string, startDate: string, endDate: string): Observable<PriceHistoryResponse> {
        let requestUrl = `/api/products/price-history`;
        let params = new HttpParams();
        params = params.set("productId", productId);
        if (startDate != null) {
            params = params.set("startDate", startDate);
        }
        if (endDate != null) {
            params = params.set("endDate", endDate);
        }
        console.log("params", params);
        return this.http.get<PriceHistoryResponse>(requestUrl, {params});
    }

}

export interface PriceHistoryResponse {
    product: Product;
    records: PriceRecord[]
}

