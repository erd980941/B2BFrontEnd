import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './service/user.service';
import { UserModel } from './model/user.model';
import { AdminDecodeService } from '../login/service/admin-decode.service';
import { AuthService } from '../login/service/auth.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  //user:UserModel=new UserModel();
  userId:number=0;
  userName:string="";

  constructor(
    private toastr:ToastrService,
    private userService:UserService,
    private adminDecodeService:AdminDecodeService,
    private authService:AuthService,
    private errorService:ErrorService
  ){

  }
  ngOnInit(): void {
    this.getUserId();
    this.getUsername();
  }

  getUserId(){
    this.userId=this.adminDecodeService.getUserId()
  }

  getUsername(){
    this.userName=this.adminDecodeService.getUserName();
  }

  update(updateForm:any){
    let user:UserModel=new UserModel();
    user.id=this.userId;
    user.name=this.userName;
    user.currentPassword=updateForm.value.currentPassword;
    user.newPassword=updateForm.value.newPassword;

    this.userService.update(user).subscribe((res:any)=>{
      this.toastr.info("Kullanıcı Bilgileri Güncellendi Tekrar Giriş Yapmalısınız.");
      this.authService.logout();
    },(err)=>{
      this.errorService.errorHandler(err);
    })
  }

  // getUser(){
  //   this.userService.getById(this.userId).subscribe((res:any)=>{
  //     this.user=res.data
  //   })
  // }
}
