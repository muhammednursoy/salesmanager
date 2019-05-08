import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Customer} from "./basket";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class CustomerService {

    constructor(private http: HttpClient) {

    }

    getCustomers(): Observable<Customer[]> {
        let requestUrl = "/api/customers/list";
        return this.http.get<Customer[]>(requestUrl);
    }

    sendShoppingHistoryEmail(id: number) {
        let requestUrl = "/api/customers/send-shopping-history-mail";
        return this.http.post<Customer[]>(requestUrl, {}, {params:{id: String(id)}});
    }
}
