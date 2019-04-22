import {Component, OnInit} from "@angular/core";
import {Page, PageRequest} from "../../../../common/page-request";
import {ShoppingService} from "../shopping.service";
import {ShoppingBasket} from "../basket";

@Component({
    selector: 'app-shopping-history',
    templateUrl: './shopping-history.component.html',
})
export class ShoppingHistoryComponent implements OnInit {
    pageRequest: PageRequest = {page: 0, size: 10, sort: "createdAt", dir: "desc"};
    shoppingHistory: ShoppingBasket[] = [];

    constructor(public shoppingService: ShoppingService) {

    }

    ngOnInit(): void {
        this.shoppingService.getShoppingHistory(this.pageRequest)
            .subscribe((page: Page) => {
                this.shoppingHistory = page.content;
            });
    }


}
