import {Component, OnInit} from "@angular/core";
import {SupplierService} from "../supplier.service";
import {Supplier} from "../supplier";
import {PageRequest, SEARCH_DUE_TIME} from "../../../../common/page-request";
import {merge, Observable, of} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs/operators";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
    selector: 'app-supplier-list',
    templateUrl: './supplier-list.component.html',
})
export class SupplierListComponent implements OnInit {
    PAGE_SIZE = 30;
    pageRequest: PageRequest = {page: 0, size: this.PAGE_SIZE};
    suppliers$: Observable<Array<Supplier>>;
    suppliers: Array<Supplier>;
    form: FormGroup;
    throttle: number = 300;
    scrollDistance: number = 1;

    constructor(public supplierService: SupplierService, public fb: FormBuilder) {

    }

    ngOnInit(): void {
        this.form = this.fb.group({searchInput: "", showDisabledSuppliers: false});
        let searchSuppliersInput$ = this.form.get("searchInput").valueChanges.pipe(distinctUntilChanged());
        this.suppliers$ = merge(
            of(""),
            searchSuppliersInput$,
        ).pipe(
            debounceTime(SEARCH_DUE_TIME),
            tap(() => this.clearPageRequest()),
            switchMap((name: string) => this.getSearchSuppliersObservable(name))
        );
        this.suppliers$.subscribe(supplierList => this.suppliers = supplierList);
    }

    onScrollDown() {
        this.pageRequest.page += 1;
        this.supplierService.searchSuppliers(this.form.get("searchInput").value, this.pageRequest).subscribe(appendSuppliersList => {
            this.suppliers.push(...appendSuppliersList)
        })
    }

    private getSearchSuppliersObservable(name: string) {
        return this.supplierService.searchSuppliers(name, {page: 0, size: this.PAGE_SIZE});
    }

    private clearPageRequest() {
        this.pageRequest = {page: 0, size: this.PAGE_SIZE};
    }
}
