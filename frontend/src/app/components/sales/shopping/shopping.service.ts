import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ShoppingBasket} from "./basket";

@Injectable({
    providedIn: 'root',
})
export class ShoppingService {

    constructor(private http: HttpClient) {

    }

    save(basket: ShoppingBasket) {
        let requestUrl = `/api/baskets/create`;
        console.log("saveBasket", basket);
        return this.http.post(requestUrl, basket)
    }
}
