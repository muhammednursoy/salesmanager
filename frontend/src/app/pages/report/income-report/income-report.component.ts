import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {ReportService} from "../report.service";
import {Chart} from "angular-highcharts";
import {NgbDate} from "@ng-bootstrap/ng-bootstrap";
import {Product} from "../../product-catalog/product/product";
import {ReportMap} from "../report";
import {ProductService} from "../../product-catalog/product/product.service";

@Component({
    selector: 'app-income-report',
    templateUrl: './income-report.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IncomeReportComponent implements OnInit {
    chart: Chart;
    fromDate: NgbDate;
    toDate: NgbDate;
    products: Array<Product | {id:"All", name: "Tümü"}>;
    selectedProductIds = [];


    constructor(
        public reportService: ReportService,
        public productService: ProductService
    ) {

    }


    ngOnInit(): void {
        this.productService.getProductList().subscribe((list: Product[]) => {
            this.products = [{id:"All", name: "Tümü"}, ...list];
        });
        this.chart = new Chart({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Gelirler'
            },
            credits: {
                enabled: false
            },
            series: [],
            xAxis: {
                type: 'datetime',
                title: {
                    text: 'Tarih'
                }
            },
            yAxis: {
                title: {
                    text: 'Gelir'
                }
            },
        });
    }



    setFromDate(date: any) {
        console.log("setFromDate", date)
        this.fromDate = date;
    }

    setToDate(date: any) {
        console.log("setToDate", date)
        this.toDate = date;
    }

    getRecords() {
        if (!this.selectedProductIds) {
            return;
        }
        this.reportService.getMonthlyIncomes(this.selectedProductIds, this.getFormattedDate(this.fromDate), this.getFormattedDate(this.toDate))
            .subscribe(response => {
                this.addSeries(response);
            })
    }

    private addSeries(incomeMap: ReportMap[]) {
        console.log("incomeMap", incomeMap);

        while(this.chart.ref.series.length > 0){
            this.chart.ref.series[0].remove(true);
        }
        let seriesIndex = 0;
        incomeMap.forEach(income => {
            this.chart.ref.addSeries({
                name: income.product,
                data: [
                ],
                type: "column",
                marker: {
                    enabled: true
                }
            });
            if (!income.values) {
                return;
            }
            income.values.forEach(report => {
                this.chart.addPoint([report.month, report.value], seriesIndex, true);
            });
            seriesIndex++;
        })
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
