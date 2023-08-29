import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductImagesComponent } from './product-images.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes=[
  {path:'',component:ProductImagesComponent}
]

@NgModule({
  declarations: [
    ProductImagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    ProductImagesComponent
  ]
})
export class ProductImagesModule { }
