import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PriceRecord} from "./product";

@Injectable({
    providedIn: 'root',
})
export class ProductPriceHistoryService {

    constructor(private http: HttpClient) {

    }

    getPriceHistory(productId: string, startDate: string, endDate: string): Observable<PriceRecord[]> {
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
        return this.http.get<PriceRecord[]>(requestUrl, {params});
    }

}

