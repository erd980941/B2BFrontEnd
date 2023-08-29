import { Inject, Injectable } from '@angular/core';
import { OrderModel } from '../model/order.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    @Inject("apiUrl") private apiUrl:string,
    private httpClient:HttpClient
  ) { }

  getList(){
    let api=this.apiUrl+"Orders/GetListDto";
    return this.httpClient.get(api);
  }

  getById(id:number){
    let api=this.apiUrl+"Orders/GetById/"+id;
    return this.httpClient.get(api);
  }

  delete(orderModel:OrderModel){
    let api=this.apiUrl+"Orders/Delete";
    return this.httpClient.post(api,orderModel);
  }

  add(orderModel:OrderModel){
    let api=this.apiUrl+"Orders/Add";
    return this.httpClient.post(api,orderModel);
  }

  update(orderModel:OrderModel){
    let api=this.apiUrl+"Orders/Update";
    return this.httpClient.post(api,orderModel);
  }
}
