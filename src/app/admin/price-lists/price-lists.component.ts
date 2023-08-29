import { Component, OnInit } from '@angular/core';
import { PriceListModel } from './model/price-list.model';
import { PriceListService } from './service/price-list.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { HelperService } from 'src/app/services/helper.service';
import { ProductModel } from '../products/model/product.model';

@Component({
  selector: 'app-price-lists',
  templateUrl: './price-lists.component.html',
  styleUrls: ['./price-lists.component.scss']
})
export class PriceListsComponent implements OnInit{

  priceLists:PriceListModel[]=[];
  priceList:PriceListModel=new PriceListModel();
  filterText:string="";

  constructor(
    private priceListService:PriceListService,
    private errorService:ErrorService,
    private toastr:ToastrService,
    private helperService:HelperService
  ){}
ngOnInit(): void {
  this.getList();
}

exportExcel(){
  let element=document.getElementById("excel-table");
  let title="Fiyat Listeleri";
  this.helperService.exportExcel(element,title);
}

getList(){
  this.priceListService.getList().subscribe((res:any)=>{
    this.priceLists=res.data;
    console.log(this.priceLists);
  },(err)=>{
    this.errorService.errorHandler(err);
  })
}

delete(priceList:PriceListModel){
  this.priceListService.delete(priceList).subscribe((res:any)=>{
    this.toastr.info(res.message);
    this.getList();
  },(err)=>{
    this.errorService.errorHandler(err);
  })
}

add(addForm:NgForm){
  let pricelist:PriceListModel=new PriceListModel();
  pricelist.name=addForm.value.priceListName;
  pricelist.id=0;
  this.priceListService.add(pricelist).subscribe((res:any)=>{
    this.toastr.success(res.message);
    this.getList();
    addForm.reset()
  },(err)=>{
    this.errorService.errorHandler(err);
  })
}

getPriceList(product:ProductModel){
  this.priceListService.getById(product.id).subscribe((res:any)=>{
    this.priceList=res.data;
  },(err)=>{
    this.errorService.errorHandler(err);
  })
}

update(){
  this.priceListService.update(this.priceList).subscribe((res:any)=>{
    this.toastr.success(res.message);
    this.getList();
    document.getElementById("updateModalCloseBtn").click()
  },(err)=>{
    this.errorService.errorHandler(err);
  })
}

}
