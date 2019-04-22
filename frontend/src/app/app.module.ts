import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CookieModule} from "ngx-cookie";
import {ProductCreateComponent} from "./components/product-catalog/product/product-create/product-create.component";
import {ProductListComponent} from "./components/product-catalog/product/product-list/product-list.component";
import {DecimalNumberDirective} from "./common/decimal-directive";
import {EnumConverterPipe} from "./common/enum-converter.pipe";
import {ShoppingCenterComponent} from "./components/sales/shopping/shopping-center/shopping-center.component";
import {NgbCollapseModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {LoginComponent} from './components/auth/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {CsrfTokenInterceptor} from "./common/csrf-token-interceptor";
import {ShoppingHistoryComponent} from "./components/sales/shopping/shopping-history/shopping-history.component";

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
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        NgbModule,
        NgbCollapseModule,
        CookieModule.forRoot(),
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: CsrfTokenInterceptor, multi: true},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
