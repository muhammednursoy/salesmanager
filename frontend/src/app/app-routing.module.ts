import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductCreateComponent} from "./components/product-catalog/product/product-create/product-create.component";
import {ProductResolverService} from "./components/product-catalog/product/product-resolver.service";
import {ProductListComponent} from "./components/product-catalog/product/product-list/product-list.component";
import {ShoppingCenterComponent} from "./components/sales/shopping/shopping-center/shopping-center.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./components/auth/auth.guard";
import {SupplierCreateComponent} from "./components/product-catalog/supplier/supplier-create/supplier-create.component";
import {SupplierResolverService} from "./components/product-catalog/supplier/supplier-resolver.service";
import {SupplierListComponent} from "./components/product-catalog/supplier/supplier-list/supplier-list.component";
import {IncomeReportComponent} from "./components/report/income-report/income-report.component";
import {ProductPriceHistoryComponent} from "./components/report/product-price-history/product-price-history.component";
import {SaleReportComponent} from "./components/report/sale-report/sale-report.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'secure',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      {
        path: 'products',
        children: [
          {
            path: 'create',
            component: ProductCreateComponent
          },
          {
            path: ':id',
            component: ProductCreateComponent,
            resolve: {
              product: ProductResolverService
            }
          },
          {
            path: '',
            component: ProductListComponent
          }
        ]
      },
      {
        path: 'suppliers',
        children: [
          {
            path: 'create',
            component: SupplierCreateComponent
          },
          {
            path: ':id',
            component: SupplierCreateComponent,
            resolve: {
              supplier: SupplierResolverService
            }
          },
          {
            path: '',
            component: SupplierListComponent
          }
        ]
      },
      {
        path: 'reports',
        children: [
          {
            path: 'income',
            component: IncomeReportComponent
          },
          {
            path: 'sales',
            component: SaleReportComponent
          },
          {
            path: 'prices',
            component: ProductPriceHistoryComponent
          },
          {
            path: '',
            redirectTo: 'income',
            pathMatch: 'prefix'
          }
        ]
      },
      {
        path: 'shopping',
        children: [
          {
            path: '',
            component: ShoppingCenterComponent
          }
        ]
      },
      {
        path: '',
        redirectTo: 'shopping',
        pathMatch: 'prefix'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/secure/shopping'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
