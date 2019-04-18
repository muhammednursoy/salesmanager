import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoryCreateComponent} from "./product-catalog/category/category-create/category-create.component";
import {CategoryEditComponent} from "./product-catalog/category/category-edit/category-edit.component";
import {CategoryListComponent} from "./product-catalog/category/category-list/category-list.component";
import {CategoryResolverService} from "./product-catalog/category/category-resolver.service";
import {ProductCreateComponent} from "./product-catalog/product/product-create/product-create.component";
import {ProductResolverService} from "./product-catalog/product/product-resolver.service";
import {ProductListComponent} from "./product-catalog/product/product-list/product-list.component";
import {ShoppingCenterComponent} from "./sales/shopping/shopping-center/shopping-center.component";

const routes: Routes = [
  {
    path: 'categories',
    children: [
      {
        path: 'create',
        component: CategoryCreateComponent
      },
      {
        path: ':id',
        component: CategoryEditComponent,
        resolve: {
          category: CategoryResolverService
        }
      },
      {
        path: '',
        component: CategoryListComponent
      }
    ]
  },
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
    path: '**',
    redirectTo: 'products'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
