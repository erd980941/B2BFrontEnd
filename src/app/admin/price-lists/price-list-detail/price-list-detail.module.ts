import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceListDetailComponent } from './price-list-detail.component';
import { PriceListDetailPipe } from './pipe/price-list-detail.pipe';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes=[
  {path:'',component:PriceListDetailComponent}
]

@NgModule({
  declarations: [
    PriceListDetailComponent,
    PriceListDetailPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    PriceListDetailComponent
  ]
})
export class PriceListDetailModule { }
