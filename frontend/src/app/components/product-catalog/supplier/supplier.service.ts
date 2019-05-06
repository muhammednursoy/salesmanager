import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Supplier} from "./supplier";
import {PageRequest} from "../../../common/page-request";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class SupplierService {

    constructor(private http: HttpClient) {

    }

    save(supplier: Supplier) {
        let requestUrl = `/api/suppliers/create`;
        return this.http.post(requestUrl, supplier)
    }

    getSupplier(id: string): Observable<Supplier> {
        let requestUrl = `/api/suppliers/${id}`;
        return this.http.get<Supplier>(requestUrl);
    }

    update(supplier: Supplier) {
        let requestUrl = `/api/suppliers/update`;
        return this.http.patch(requestUrl, supplier);
    }

    searchSuppliers(name: string, pageRequest: PageRequest): Observable<Supplier[]> {
        let requestUrl = `/api/suppliers?page=${pageRequest.page}&size=${pageRequest.size}`;
        return this.http.get<any>(requestUrl, {params: {name}}).pipe(map(response => response.content))
    }

    getSupplierList(): Observable<Supplier[]> {
        let requestUrl = `/api/suppliers/list`;
        return this.http.get<any>(requestUrl)
    }
}
