import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductCreateComponent} from "./components/product-catalog/product/product-create/product-create.component";
import {ProductResolverService} from "./components/product-catalog/product/product-resolver.service";
import {ProductListComponent} from "./components/product-catalog/product/product-list/product-list.component";
import {ShoppingCenterComponent} from "./components/sales/shopping/shopping-center/shopping-center.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./components/auth/auth.guard";

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
