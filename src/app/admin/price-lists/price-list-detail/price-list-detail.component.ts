import { Component } from '@angular/core';
import { PriceListDetailModel } from './model/price-list-details.model';
import { PriceListDetailService } from './service/price-list-detail.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { HelperService } from 'src/app/services/helper.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../products/service/product.service';
import { ProductModel } from '../../products/model/product.model';

@Component({
  selector: 'app-price-list-detail',
  templateUrl: './price-list-detail.component.html',
  styleUrls: ['./price-list-detail.component.scss']
})
export class PriceListDetailComponent {
  products:ProductModel[]=[];
  priceListDetails:PriceListDetailModel[]=[];
  priceListDetail:PriceListDetailModel=new PriceListDetailModel();
  filterText:string="";
  priceListId:number=0;

  constructor(
    private priceListDetailService:PriceListDetailService,
    private errorService:ErrorService,
    private toastr:ToastrService,
    private helperService:HelperService,
    private activatedRoute:ActivatedRoute,
    private productService:ProductService
  ){}
ngOnInit(): void {
  this.activatedRoute.params.subscribe((res:any)=>{
    this.priceListId=res.id
    this.getList();
    this.getProductList();
  })
}

exportExcel(){
  let element=document.getElementById("excel-table");
  let title="Fiyat Listesi Detayı";
  this.helperService.exportExcel(element,title);
}

getProductList(){
  this.productService.getList().subscribe((res:any)=>{
    this.products=res.data;
  },(err)=>{
    this.errorService.errorHandler(err);
  })
}

getList(){
  this.priceListDetailService.getList(this.priceListId).subscribe((res:any)=>{
    this.priceListDetails=res.data;
    console.log(this.priceListDetails);
  },(err)=>{
    this.errorService.errorHandler(err);
  })
}

delete(priceList:PriceListDetailModel){
  this.priceListDetailService.delete(priceList).subscribe((res:any)=>{
    this.toastr.info(res.message);
    this.getList();
  },(err)=>{
    this.errorService.errorHandler(err);
  })
}

add(addForm:NgForm){
  let pricelistDetail:PriceListDetailModel=new PriceListDetailModel();
  pricelistDetail.productId=addForm.value.productId;
  pricelistDetail.price=addForm.value.price;
  pricelistDetail.priceListId=this.priceListId;
  pricelistDetail.id=0;
  this.priceListDetailService.add(pricelistDetail).subscribe((res:any)=>{
    this.toastr.success(res.message);
    this.getList();
    addForm.reset()
  },(err)=>{
    this.errorService.errorHandler(err);
  })
}



update(priceListDetail:PriceListDetailModel){
  this.priceListDetailService.update(priceListDetail).subscribe((res:any)=>{
    this.toastr.success(res.message);
    this.getList();
  },(err)=>{
    this.errorService.errorHandler(err);
  })
}
}
