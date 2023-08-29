import { Component } from '@angular/core';
import { OrderModel } from './model/order.model';
import { OrderService } from './service/order.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
    orders:OrderModel[]=[];
    order:OrderModel=new OrderModel();
    filterText:string="";
    statusText: string = "Tümü";

    constructor(
      private orderService:OrderService,
      private errorService:ErrorService,
      private toastr:ToastrService,
      private helperService:HelperService
    ){}
  ngOnInit(): void {
    this.getList();
  }

  exportExcel(){
    let element=document.getElementById("excel-table");
    let title="Siparişler";
    this.helperService.exportExcel(element,title);
  }

  getList(){
    this.orderService.getList().subscribe((res:any)=>{
      this.orders=res.data;
      console.log(this.orders);
    },(err)=>{
      this.errorService.errorHandler(err);
    })
  }

  update(order:OrderModel,status:string){
    order.status=status;
    this.orderService.update(order).subscribe((res:any)=>{
      this.toastr.success(res.message);
      this.getList();
    },(err)=>{
      this.errorService.errorHandler(err);
    })
  }
}
