import {Component, Input, OnInit} from '@angular/core';
import {Chart} from "angular-highcharts";
import {ProductPriceHistoryService} from "../product-price-history.service";
import {PriceRecord, Product} from "../product";
import {NgbDate} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-price-history',
    templateUrl: './product-price-history.component.html',
})
export class ProductPriceHistoryComponent implements OnInit {
    PAGE_SIZE = 5;
    chart: Chart;
    records: Array<PriceRecord> = [];
    subRecordList: PriceRecord[] = [];
    fromDate: NgbDate;
    toDate: NgbDate;

    @Input("product") product: Product;

    constructor(public priceHistoryService: ProductPriceHistoryService) {
    }

    ngOnInit() {

        this.priceHistoryService.getPriceHistory(this.product.id.toString(), null, null).subscribe(response => {

            console.log("response", response);
            this.init(response);

        });
    }

    init(response: PriceRecord[]) {
        let chart = new Chart({
            chart: {
                type: 'line'
            },
            title: {
                text: this.product.name + ' Ürününün Fiyat Geçmişi'
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Fiyat Değişikliği',
                data: [
                ],
                type: "line",
                marker: {
                    enabled: true
                }
            }],
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: { // don't display the dummy year
                    month: {main:'%e. %b'},
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
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x:%e. %b}: {point.y:.2f}TL/1' + this.getUnit()
            },
        });
        response.forEach(record => {
            return chart.addPoint([record.createdAt, record.unitPrice]);
        });

        this.chart = chart;
        this.records = response;

        this.subRecordList = this.records.slice(0, this.PAGE_SIZE);

        console.log("records lenght", this.records.length);

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
        this.priceHistoryService.getPriceHistory(String(this.product.id), this.getFormattedDate(this.fromDate), this.getFormattedDate(this.toDate)).subscribe(response => {
            console.log("response", response);
            while(this.chart.ref.series.length > 0){
                this.chart.ref.series[0].remove(true);
            }
            this.chart.ref.addSeries({
                name: 'Fiyat Değişikliği',
                data: [
                ],
                type: "line",
                marker: {
                    enabled: true
                }
            })
            response.forEach(record => this.chart.addPoint([record.createdAt, record.unitPrice]))
            this.records = response;
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
}
