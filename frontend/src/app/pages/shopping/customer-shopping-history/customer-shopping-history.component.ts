import {Component, OnInit} from "@angular/core";
import {Customer} from "../basket";
import {CustomerService} from "../customer.service";

@Component({
    selector: 'app-customer-shopping-history',
    templateUrl: './customer-shopping-history.component.html',
})
export class CustomerShoppingHistoryComponent implements OnInit {
    customers: Customer[];
    selectedCustomer: Customer;


    constructor(
        public customerService: CustomerService
    ) {

    }

    ngOnInit(): void {
        this.customerService.getCustomers().subscribe(customers => this.customers = customers);
    }

    sendShoppingHistoryEmail() {
        if (!this.selectedCustomer) {
            return;
        }
        this.customerService.sendShoppingHistoryEmail(this.selectedCustomer.id).subscribe();
    }
}
