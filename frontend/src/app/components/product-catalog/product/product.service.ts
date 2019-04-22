import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "./product";
import {PageRequest} from "../../../common/page-request";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class ProductService {

    constructor(private http: HttpClient) {

    }

    save(product: Product) {
        let requestUrl = `/api/products/create`;
        return this.http.post(requestUrl, product)
    }

    getProduct(id: string): Observable<Product> {
        let requestUrl = `/api/products/${id}`;
        return this.http.get<Product>(requestUrl);
    }

    update(product: Product) {
        let requestUrl = `/api/products/update`;
        return this.http.patch(requestUrl, product);
    }

    searchProducts(name: string, pageRequest: PageRequest): Observable<Product[]> {
        let requestUrl = `/api/products?page=${pageRequest.page}&size=${pageRequest.size}`;
        return this.http.get<any>(requestUrl, {params: {name}}).pipe(map(response => response.content))
    }
}
