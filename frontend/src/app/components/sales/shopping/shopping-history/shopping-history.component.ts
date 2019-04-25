import {Component, Inject, LOCALE_ID, OnInit} from "@angular/core";
import {Page, PageRequest} from "../../../../common/page-request";
import {ShoppingService} from "../shopping.service";
import {ShoppingBasket} from "../basket";
import {BasketService} from "../basket.service";

@Component({
    selector: 'app-shopping-history',
    templateUrl: './shopping-history.component.html',
})
export class ShoppingHistoryComponent implements OnInit {
    pageRequest: PageRequest = {page: 0, size: 10, sort: "createdAt", dir: "desc"};
    shoppingHistory: ShoppingBasket[] = [];
    lastHistoryPage: boolean;

    constructor(public shoppingService: ShoppingService,
                public basketService: BasketService,
                @Inject(LOCALE_ID) private locale: string) {

    }

    ngOnInit(): void {
        this.shoppingService.getShoppingHistory(this.pageRequest)
            .subscribe((page: Page) => {
                this.shoppingHistory = page.content;
            });
    }

    replaceBasket(basket: ShoppingBasket) {
        this.basketService.replaceBasket(basket);
    }

    disableBasket(basket: ShoppingBasket) {
        this.shoppingService.disableBasket(basket.id).subscribe(() => basket.disabled = true);
    }

    enableBasket(basket: ShoppingBasket) {
        this.shoppingService.enableBasket(basket.id).subscribe(() => basket.disabled = false);
    }

    loadRecords() {
        if (this.lastHistoryPage) {
            return;
        }
        this.pageRequest.page += 1;
        this.shoppingService.getShoppingHistory(this.pageRequest)
            .subscribe((page: Page) => {
                console.log("page", page);
                this.lastHistoryPage = page.last;
                this.shoppingHistory.push(...page.content);
            });
    }
}
