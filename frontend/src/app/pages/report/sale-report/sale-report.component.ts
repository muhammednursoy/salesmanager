import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {ReportService} from "../report.service";
import {Chart} from "angular-highcharts";
import {NgbDate} from "@ng-bootstrap/ng-bootstrap";
import {Product} from "../../product-catalog/product/product";
import {ReportMap} from "../report";
import {ProductService} from "../../product-catalog/product/product.service";
import {EnumConverterPipe} from "../../../common/enum-converter.pipe";

@Component({
    selector: 'app-sale-report',
    templateUrl: './sale-report.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [EnumConverterPipe]
})
export class SaleReportComponent implements OnInit {
    chart: Chart;
    fromDate: NgbDate;
    toDate: NgbDate;
    products: Array<Product | {id:"All", name: "Tümü"}>;
    selectedProductIds = [];


    constructor(
        public reportService: ReportService,
        public productService: ProductService,
        public enumsPipe: EnumConverterPipe
    ) {

    }


    ngOnInit(): void {
        this.productService.getProductList().subscribe((list: Product[]) => {
            this.products = list;
        });
        this.chart = new Chart({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Satışlar'
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
                    text: 'Satış'
                }
            },
        });
    }



    setFromDate(date: any) {
        this.fromDate = date;
    }

    setToDate(date: any) {
        this.toDate = date;
    }

    getRecords() {
        if (!this.selectedProductIds) {
            return;
        }
        this.reportService.getMonthlySales(this.selectedProductIds, this.getFormattedDate(this.fromDate), this.getFormattedDate(this.toDate))
            .subscribe(response => {
                this.addSeries(response);
            })
    }

    private addSeries(salesMap: ReportMap[]) {
        while(this.chart.ref.series.length > 0){
            this.chart.ref.series[0].remove(true);
        }
        let seriesIndex = 0;
        salesMap.forEach(sales => {
            this.chart.ref.addSeries({
                name: sales.product,
                data: [
                ],
                type: "column",
                marker: {
                    enabled: true
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.x:%e. %b}: {point.y:.2f} ' + this.enumsPipe.transform(sales.unit)
                }
            });
            if (!sales.values) {
                return;
            }
            sales.values.forEach(report => {
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
        return s;
    }
}
