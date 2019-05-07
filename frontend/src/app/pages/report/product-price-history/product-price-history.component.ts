import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Chart} from "angular-highcharts";
import {ProductPriceHistoryService} from "../../product-catalog/product/product-price-history.service";
import {PriceRecord, Product} from "../../product-catalog/product/product";
import {NgbDate} from "@ng-bootstrap/ng-bootstrap";
import {ProductService} from "../../product-catalog/product/product.service";

@Component({
    selector: 'app-price-history',
    templateUrl: './product-price-history.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPriceHistoryComponent implements OnInit {
    PAGE_SIZE = 5;
    chart: Chart;
    records: Array<PriceRecord> = [];
    subRecordList: PriceRecord[] = [];
    fromDate: NgbDate;
    toDate: NgbDate;
    products: Array<Product>;
    selectedProductId;
    product: Product;

    constructor(public priceHistoryService: ProductPriceHistoryService, public productService: ProductService) {
    }

    ngOnInit() {
        this.productService.getProductList().subscribe((list: Product[]) => {
            this.products = list;
        });

        this.chart = new Chart({
            chart: {
                type: 'line'
            },
            credits: {
                enabled: false
            },
            title: {
                text: 'Fiyat Değişiklikleri'
            },
            series: [],
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                    month: {main: '%e. %b'},
                    year: {main: '%b'}
                },
                title: {
                    text: 'Tarih'
                }
            },
            yAxis: {
                title: {
                    text: 'Fiyat'
                }
            },
        });
    }

    getUnit() {
        if (this.product.unit == "KG" || this.product.unit == "GR") {
            return "KG";
        }
        if (this.product.unit == "LT" || this.product.unit == "ML") {
            return "LT";
        }
        return "Tane";
    }

    onPageChanged(pagePlusOne: number) {
        let page = pagePlusOne - 1;
        this.displayRecordTable(page);
    }

    setFromDate(date: any) {
        this.fromDate = date;
    }

    setToDate(date: any) {
        this.toDate = date;
    }

    getRecords() {
        if (!this.selectedProductId) {
            return;
        }
        this.priceHistoryService.getPriceHistory(String(this.selectedProductId), this.getFormattedDate(this.fromDate), this.getFormattedDate(this.toDate)).subscribe(response => {
            while(this.chart.ref.series.length > 0){
                this.chart.ref.series[0].remove(true);
            }
            this.chart.ref.addSeries({

                name: this.getSelectProductName(),
                data: [
                ],
                type: "line",
                marker: {
                    enabled: true
                }
            });
            this.product = response.product;
            this.records = response.records;
            this.records.forEach(record => this.chart.addPoint([record.createdAt, record.unitPrice]))
            console.log("records", this.records);
            this.displayRecordTable(0);
        });
    }

    private displayRecordTable(page) {
        this.subRecordList = this.records.slice(this.PAGE_SIZE * (page), 5 * (page) + this.PAGE_SIZE);
        console.log("this.subRecordList", this.subRecordList);
    }

    private getFormattedDate(date: NgbDate) {
        if (date == null) {
            return null;
        }
        let s = (date.day < 10 ? "0" : "") + String(date.day) + "/" + (date.month < 10 ? "0" : "") + String(date.month) + "/" + String(date.year);
        console.log("date", date);
        console.log("str", s);
        return s;
    }

    private getSelectProductName() {
        return this.products.find(product => product.id == this.selectedProductId).name
    }
}
