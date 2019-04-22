import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ShoppingBasket} from "./basket";
import {PageRequest} from "../../../common/page-request";

@Injectable({
    providedIn: 'root',
})
export class ShoppingService {

    constructor(private http: HttpClient) {

    }

    save(basket: ShoppingBasket) {
        let requestUrl = `/api/baskets/create`;
        return this.http.post(requestUrl, basket)
    }

    getShoppingHistory(pageRequest: PageRequest) {
        let requestUrl = `/api/baskets/history?page=${pageRequest.page}&size=${pageRequest.size}&sort=${pageRequest.sort},${pageRequest.dir}`;
        return this.http.get(requestUrl)
    }
}
