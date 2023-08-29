import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { CustomerPipe } from './pipe/customer.pipe';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes=[
  {path:'',component:CustomersComponent}
]

@NgModule({
  declarations: [
    CustomersComponent,
    CustomerPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    CustomersComponent,
  ]
})
export class CustomersModule { }
