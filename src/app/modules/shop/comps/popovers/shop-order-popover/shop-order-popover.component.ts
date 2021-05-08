import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../../services/shop.service';
import { NotifyService } from 'src/app/services/notify.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-shop-order-popover',
  templateUrl: './shop-order-popover.component.html',
  styleUrls: ['./shop-order-popover.component.scss'],
})
export class ShopOrderPopoverComponent implements OnInit {
  popover:any;
  id:any;
  constructor(
    private alertCTR:AlertController,
    private shopSer:ShopService,
    private notify:NotifyService,
    private router:Router
    ) { }

  ngOnInit() {}
closePopover()
{
  
  this.shopSer.sideoptionsPopover.subscribe(res=>{

    this.popover=res;
    this.id=this.popover.id
    this.popover.dismiss();
  })

}


seeproducts()
{
  this.closePopover();
  this.router.navigateByUrl('/shop/'+this.id+'/OrderProducts');
}
// async presentAlertConfirm() {

//   const alert = await this.alertCTR.create({
//     cssClass: 'my-custom-class',
//     header: 'Confirm!',
//     message: '<strong>Are you want to Delete this</strong>',
//     buttons: [
//       {
//         text: 'Cancel',
//         role: 'cancel',
//         cssClass: 'secondary',
//         handler: (blah) => {
        
//         }
//       }, {
//         text: 'Delete',
//         handler: () => {
//           this.shopSer.delete(this.id).subscribe(res=>{
//             this.shopSer.getOrdersFromDB("","1");
//            this.notify.Alert("Success","Brand successfully Deleted",2000);
//           },
//           error=>{
//             error.error.error.forEach(element => {
//               this.notify.Alert("Error",element,"2000");
//             });
//           })
//         }
//       }
//     ]
//   });

//   await alert.present();
// }

}
