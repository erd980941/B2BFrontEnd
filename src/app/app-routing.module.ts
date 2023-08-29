import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './admin/layouts/layouts.component';
import { HomeComponent } from './admin/home/home.component';
import { LoginComponent } from './admin/login/login.component';
import { authGuard } from './admin/login/guard/auth.guard';
import { ProductsComponent } from './admin/products/products.component';
import { ProductImagesComponent } from './admin/products/product-images/product-images.component';
import { PriceListsComponent } from './admin/price-lists/price-lists.component';
import { PriceListDetailComponent } from './admin/price-lists/price-list-detail/price-list-detail.component';
import { CustomersComponent } from './admin/customers/customers.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { OrderDetailComponent } from './admin/orders/order-detail/order-detail.component';
import { ProfileComponent } from './admin/profile/profile.component';

const routes: Routes = [
  {
    path:'admin-login',
    component:LoginComponent,
    loadChildren:()=>import('./admin/login/login.module').then(m=>m.LoginModule)
  },
  {
    path:'admin',
    component:LayoutsComponent,
    canActivate:[authGuard],
    children:[
      {path:'',component:HomeComponent,loadChildren:()=>import('./admin/home/home.module').then(m=>m.HomeModule)},
      {
        path:'products',
        children:[
          {path:'',component:ProductsComponent,loadChildren:()=>import('./admin/products/products.module').then(m=>m.ProductsModule)},
          {path:':id/images',component:ProductImagesComponent,loadChildren:()=>import('./admin/products/product-images/product-images.module').then(m=>m.ProductImagesModule)}
        ]
      },
      {
        path:'price-lists',children:[
          {path:'',component:PriceListsComponent,loadChildren:()=>import('./admin/price-lists/price-lists.module').then(m=>m.PriceListsModule)},
          {path:':id',component:PriceListDetailComponent,loadChildren:()=>import('./admin/price-lists/price-list-detail/price-list-detail.module').then(m=>m.PriceListDetailModule)}
        ]
      },
      {
        path:'customers',
        children:[
          {path:'',component:CustomersComponent,loadChildren:()=>import('./admin/customers/customers.module').then(m=>m.CustomersModule)},
        ]
      },
      {
        path:'orders',
        children:[
          {path:'',component:OrdersComponent,loadChildren:()=>import('./admin/orders/orders.module').then(m=>m.OrdersModule)},
          {path:':id',component:OrderDetailComponent,loadChildren:()=>import('./admin/orders/order-detail/order-detail.module').then(m=>m.OrderDetailModule)}
        ]
      },
      {
        path:'profile',
        component:ProfileComponent,
        loadChildren:()=>import('./admin/profile/profile.module').then(m=>m.ProfileModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
