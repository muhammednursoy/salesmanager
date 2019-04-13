import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CategoryCreateComponent} from "./product-catalog/category/category-create/category-create.component";
import {CategoryEditComponent} from "./product-catalog/category/category-edit/category-edit.component";
import {CategoryListComponent} from "./product-catalog/category/category-list/category-list.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CsrfTokenInterceptor} from "./interceptor/csrf-token.interceptor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CookieModule} from "ngx-cookie";
import {ProductCreateComponent} from "./product-catalog/product/product-create/product-create.component";
import {ProductListComponent} from "./product-catalog/product/product-list/product-list.component";
import {DecimalNumberDirective} from "./common/decimal-directive";
import {EnumConverterPipe} from "./common/enum-converter.pipe";

@NgModule({
  declarations: [
    AppComponent,
    CategoryCreateComponent,
    CategoryEditComponent,
    CategoryListComponent,
    ProductCreateComponent,
    ProductListComponent,
    DecimalNumberDirective,
    EnumConverterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CookieModule.forRoot(),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: CsrfTokenInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
