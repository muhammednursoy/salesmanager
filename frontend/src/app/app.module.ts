import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpRequest} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CookieModule} from "ngx-cookie";
import {ProductCreateComponent} from "./components/product-catalog/product/product-create/product-create.component";
import {ProductListComponent} from "./components/product-catalog/product/product-list/product-list.component";
import {DecimalNumberDirective} from "./common/decimal-directive";
import {EnumConverterPipe} from "./common/enum-converter.pipe";
import {ShoppingCenterComponent} from "./components/sales/shopping/shopping-center/shopping-center.component";
import {NgbButtonsModule, NgbCollapseModule, NgbDatepickerModule, NgbModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {LoginComponent} from './components/auth/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {CsrfTokenInterceptor} from "./common/csrf-token-interceptor";
import {ShoppingHistoryComponent} from "./components/sales/shopping/shopping-history/shopping-history.component";
import {BlockUIModule} from "ng-block-ui";
import {BlockUIHttpModule} from "ng-block-ui/http";
import {ProductPriceHistoryComponent} from "./components/product-catalog/product/product-price-history/product-price-history.component";
import {ChartModule, HIGHCHARTS_MODULES} from "angular-highcharts";
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import {NgbDatepickerRange} from "./common/datepicker-range/datepicker.range";

export function filterGET(req: HttpRequest<any>) {
    return req.method == "GET" && /^\/api\/.*/.test(req.url);
}


@NgModule({
    declarations: [
        AppComponent,
        ProductCreateComponent,
        ProductListComponent,
        DecimalNumberDirective,
        EnumConverterPipe,
        ShoppingCenterComponent,
        LoginComponent,
        HomeComponent,
        ShoppingHistoryComponent,
        ProductPriceHistoryComponent,
        NgbDatepickerRange,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        NgbModule,
        NgbCollapseModule,
        NgbButtonsModule,
        NgbTooltipModule,
        ChartModule,
        NgbDatepickerModule,
        CookieModule.forRoot(),
        BlockUIModule.forRoot(),
        BlockUIHttpModule.forRoot({
            requestFilters: [filterGET]
        }),
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: CsrfTokenInterceptor, multi: true},
        {provide: HIGHCHARTS_MODULES, useFactory: () => [ more, exporting ]},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
