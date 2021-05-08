import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { observeOn } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CartModel } from '../models/cart.model';
import { NotifyService } from 'src/app/services/notify.service';
import { AuthService } from 'src/app/services/auth.service';
import { MyEnviroment } from 'src/app/GlobalFiles/MyEnviroment';


@Injectable({
  providedIn: 'root'
})
export class cartService {

  // variables
  SPID= new BehaviorSubject<any>(null);

  cartList=new BehaviorSubject<CartModel[]>([]);
   tempArray:CartModel[];
   saveArray:any[]=[];
  constructor(
    private http:HttpClient,
    private notify:NotifyService,
    private router:Router,
    private auth:AuthService
    ) {
      if(!localStorage.getItem("cartList"))
      {
        localStorage.setItem("cartList",JSON.stringify([]));
      }
      else
      {
        this.cartList.next(JSON.parse(localStorage.getItem("cartList")))
      }


   }
   private baseUrl=MyEnviroment.baseUrl+"admin/product/order/";
   removeProduct(id)
   {
    this.tempArray=[];

    this.saveArray=JSON.parse(localStorage.getItem("cartList"));
    this.saveArray.forEach(el=>{
      if(el.id==id){
       this.notify.Alert("Success","Product has been removed from cart",1000)
      }
      else
      {
        this.tempArray.push(el);
      }

      });
      localStorage.setItem("cartList",JSON.stringify(this.tempArray));
      this.cartList.next(this.tempArray);
   }

addProduct(id,name,sadmin,quantity,image,price)
{

  if(!this.auth.IsLogged.value)
  {
    this.notify.Alert("Error","You must have to Login",1000);
    return;
  }
  this.tempArray=[];
  var isSuccess=false;
  var isSameAdmin=false;
  var nsadmin:any="";
  this.saveArray=JSON.parse(localStorage.getItem("cartList"));
  this.saveArray.forEach(el=>{
    nsadmin=el.sadmin;
    if(el.id==id){
      el.quantity=quantity;
      this.notify.Alert("Success","Product Quantity Updated",2000);
      isSuccess=true;
    }
    this.tempArray.push(el);
    });

    if(!isSuccess)
    {
      // if(nsadmin=="" || nsadmin==sadmin)
      // {
        let obj = new CartModel();
        obj.id=id;
        obj.name=name;
        obj.quantity=quantity;
        obj.sadmin=sadmin;
        obj.image=image;
        obj.price=price;
        obj.total=price*quantity;
        this.tempArray.push(obj);
        this.notify.Alert("Success","Product Added",1000);
      // }
      // else
      // {
      //   this.notify.Alert("Error","Product must be from Same Shop in a Cart",1000);
      //   this.router.navigateByUrl("/shop/"+nsadmin+"/products");
      // }

    }

    localStorage.setItem("cartList",JSON.stringify(this.tempArray));
     this.cartList.next(this.tempArray);


}
   update(form)
   {
    return this.http.post(this.baseUrl+'update',form);
   }

  getAllOrdersFromDB(keys,page)
  {
  //  this.http.post(this.baseUrl+'all?keywords='+keys+"&page="+page,null).subscribe(res=>{
  //     var r:any=res;
  //       this.AllOrdersDBList.next(r.allorders.data);
  //       this.Pagination.next(r.allorders);
  //      },error=>{
  //    error.error.error.forEach(element => {
  //             this.notify.ToastrError("Error",element);
  //    });
  //  });
  }

}
