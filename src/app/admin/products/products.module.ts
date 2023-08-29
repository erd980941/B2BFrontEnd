import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductPipe } from './pipe/product.pipe';
import { FormsModule } from '@angular/forms';
import { ProductImagesModule } from './product-images/product-images.module';

const routes:Routes=[
  {path:'',component:ProductsComponent}
]

@NgModule({
  declarations: [
    ProductsComponent,
    ProductPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ProductImagesModule
    
  ],
  exports:[
    ProductsComponent,
    ProductImagesModule
  ]
})
export class ProductsModule { }
