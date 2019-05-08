import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/auth/login/login.component";
import {AuthGuard} from "./pages/auth/auth.guard";
import {HomeComponent} from "./pages/home/home.component";
import {ProductCreateComponent} from "./pages/product-catalog/product/product-create/product-create.component";
import {ProductResolverService} from "./pages/product-catalog/product/product-resolver.service";
import {ProductListComponent} from "./pages/product-catalog/product/product-list/product-list.component";
import {SupplierCreateComponent} from "./pages/product-catalog/supplier/supplier-create/supplier-create.component";
import {SupplierResolverService} from "./pages/product-catalog/supplier/supplier-resolver.service";
import {SupplierListComponent} from "./pages/product-catalog/supplier/supplier-list/supplier-list.component";
import {IncomeReportComponent} from "./pages/report/income-report/income-report.component";
import {SaleReportComponent} from "./pages/report/sale-report/sale-report.component";
import {ProductPriceHistoryComponent} from "./pages/report/product-price-history/product-price-history.component";
import {ShoppingCenterComponent} from "./pages/shopping/shopping-center/shopping-center.component";
import {CustomerShoppingHistoryComponent} from "./pages/shopping/customer-shopping-history/customer-shopping-history.component";

export let routes: Routes = [
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
        component: ShoppingCenterComponent
      },
      {
        path: 'purchase-history',
        component: CustomerShoppingHistoryComponent
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
export class AppRoutingModule {
}
