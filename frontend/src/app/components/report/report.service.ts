import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReportMap} from "./report";

@Injectable({
    providedIn: 'root',
})
export class ReportService {

    constructor(private http: HttpClient) {

    }

    getMonthlyIncomes(selectedProducts, fromDate, toDate): Observable<ReportMap[]> {
        let requestUrl = "/api/reports/income/monthly";
        let params = new HttpParams();
        params = params.set("productIds", selectedProducts);
        if (fromDate != null) {
            params = params.set("fromDate", fromDate);
        }
        if (toDate != null) {
            params = params.set("toDate", toDate);
        }
        console.log("params", params);
        return this.http.get<ReportMap[]>(requestUrl, {params})
    }


    getMonthlySales(selectedProducts, fromDate, toDate): Observable<ReportMap[]> {
        let requestUrl = "/api/reports/sales/monthly";
        let params = new HttpParams();
        params = params.set("productIds", selectedProducts);
        if (fromDate != null) {
            params = params.set("fromDate", fromDate);
        }
        if (toDate != null) {
            params = params.set("toDate", toDate);
        }
        console.log("params", params);
        return this.http.get<ReportMap[]>(requestUrl, {params})
    }
}
