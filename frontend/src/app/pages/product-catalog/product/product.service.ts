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

    searchProducts(name: string, showDisabledProducts: string, pageRequest: PageRequest): Observable<Product[]> {
        let requestUrl = `/api/products?page=${pageRequest.page}&size=${pageRequest.size}`;
        return this.http.get<any>(requestUrl, {params: {name, showDisabledProducts}}).pipe(map(response => response.content))
    }

    searchEnabledProducts(name: string, pageRequest: PageRequest) {
        let requestUrl = `/api/products?page=${pageRequest.page}&size=${pageRequest.size}`;
        return this.http.get<any>(requestUrl, {params: {name, showDisabledProducts: String(false)}}).pipe(map(response => response.content))
    }

    disableProduct(id: number) {
        let requestUrl = `/api/products/disable?id=${id}`;
        return this.http.post(requestUrl, {});
    }

    enableProduct(id: number) {
        let requestUrl = `/api/products/enable?id=${id}`;
        return this.http.post(requestUrl, {});
    }

    getProductList(): Observable<Product[]> {
        let requestUrl = `/api/products/list`;
        return this.http.get<Product[]>(requestUrl);
    }
}
