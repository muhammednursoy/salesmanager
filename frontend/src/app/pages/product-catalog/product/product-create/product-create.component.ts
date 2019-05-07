import {Component, OnInit} from "@angular/core";
import {ProductService} from "../product.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UNIT_LIST, UNITS} from "../../../../common/unit";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../product";
import {SupplierService} from "../../supplier/supplier.service";
import {Supplier} from "../../supplier/supplier";

@Component({
    selector: 'app-product-create',
    templateUrl: './product-create.component.html',
})
export class ProductCreateComponent implements OnInit {
    form: FormGroup;
    units = UNIT_LIST;
    submitted: boolean;
    isUpdate: boolean;
    product: Product;
    suppliers: Supplier[];

    constructor(
        public productService: ProductService,
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
        let product: Product = this.route.snapshot.data.product;
        if (product) {
            this.isUpdate = true;
            this.product = product;
            this.form.patchValue(product);
            this.controls.unit.setValue(UNITS[product.unit])
        }

        this.fetchSupplierList();

    }

    onSubmit() {
        this.submitted = true;

        if (!this.form.valid) {
            return;
        }

        let product: Product = this.form.value;
        product.unit = this.form.value.unit.enumValue;
        if (product.id) {
            this.productService.update(product).subscribe(() => this.router.navigate(["/secure/products"]));
        } else {
            this.productService.save(product).subscribe(() => this.router.navigate(["/secure/products"]));
        }
    }

    private initForm() {
        this.form = this.fb.group({
                id: "",
                name: ["", [Validators.required]],
                price: ["", [Validators.required]],
                unit: [UNITS.KG, [Validators.required]],
                baseAmount: ["", [Validators.required]],
                description: ["", []],
                supplier: [null, []]
            }
        )
    }

    private fetchSupplierList() {
        this.supplierService.getSupplierList().subscribe(suppliers => {
            this.suppliers = suppliers;
            if (this.isUpdate && this.product.supplier && this.product.supplier.id) {
                let supplier = suppliers.find(value => value.id == this.product.supplier.id);
                this.form.get("supplier").setValue(supplier)
            }
        })
    }
}
