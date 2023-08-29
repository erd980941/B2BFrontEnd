import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private toastr:ToastrService
  ) { }

  errorHandler(err:any){

    if(err.status==400) this.toastr.error(err.error);
    else if(err.status==0) this.toastr.error("Bağlantı Hatası. Lütfen Daha Sonra Tekrar Deneyiniz.");
    else if(err.status==405) this.toastr.error("Bilinmeyen Hata");
    else this.toastr.error(err.error.Message);
  }
}
