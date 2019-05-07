import {Component, OnInit} from "@angular/core";
import {SupplierService} from "../supplier.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UNIT_LIST, UNITS} from "../../../../common/unit";
import {ActivatedRoute, Router} from "@angular/router";
import {Supplier} from "../supplier";

@Component({
    selector: 'app-supplier-create',
    templateUrl: './supplier-create.component.html',
})
export class SupplierCreateComponent implements OnInit {
    form: FormGroup;
    units = UNIT_LIST;
    submitted: boolean;
    isUpdate: boolean;
    supplier: Supplier;

    constructor(
        public supplierService: SupplierService,
        public fb: FormBuilder,
        public router: Router,
        public route: ActivatedRoute
    ) {

    }

    public get controls() {
        return this.form.controls;
    }

    ngOnInit(): void {
        this.initForm();
        let supplier: Supplier = this.route.snapshot.data.supplier;
        console.log("supplier", supplier)
        if (supplier) {
            this.isUpdate = true;
            this.supplier = supplier;
            this.form.patchValue(supplier);
        }

    }

    onSubmit() {
        this.submitted = true;

        if (!this.form.valid) {
            return;
        }

        let supplier: Supplier = this.form.value;
        if (this.isUpdate) {
            this.supplierService.update(supplier).subscribe(() => this.router.navigate(["/secure/suppliers"]));
        } else {
            this.supplierService.save(supplier).subscribe(() => this.router.navigate(["/secure/suppliers"]));
        }
    }


    private initForm() {
        this.form = this.fb.group({
                id: "",
                name: ["", [Validators.required]],
                phone: ["", []],
                email: ["", []],
                address: ["", []],
                description: ["", []]
            }
        )
    }
}
