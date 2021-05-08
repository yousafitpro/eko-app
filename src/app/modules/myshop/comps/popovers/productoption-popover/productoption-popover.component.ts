import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NotifyService } from 'src/app/services/notify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CategoryModel } from 'src/app/modules/shop/models/category.model';
import { ProductModel } from 'src/app/modules/shop/models/product.model';

@Component({
  selector: 'app-productoption-popover',
  templateUrl: './productoption-popover.component.html',
  styleUrls: ['./productoption-popover.component.scss'],
})
export class ProductoptionPopoverComponent implements OnInit {

  popover:any;
  id:any;
  cateId="";
  products:ProductModel[]=[];
  constructor(
    private productSer:ProductService,
    public alertController: AlertController,
    private notify:NotifyService,
    private router:Router,
    private route:ActivatedRoute
    ) {
      this.productSer.saveAllProductsDBList.subscribe(res=>this.products=res);
     }

  ngOnInit() {
    this.route.params.subscribe(res=>{
      this.cateId=res['cateId'];
    })
  }
closePopover()
{
  
  this.productSer.sideoptionsPopover.subscribe(res=>{

    this.popover=res;
    this.id=this.popover.id
    this.popover.dismiss();
  })

}
ShowDeleteConfirmAlert()
{
  this.closePopover();
  this.presentAlertConfirm();
}
edit()
{
  this.closePopover();
  this.router.navigateByUrl('/myshop/'+this.id+'/updateProduct');
}
async presentAlertConfirm() {

  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Confirm!',
    message: '<strong>Are you want to Delete this</strong>',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
        
        }
      }, {
        text: 'Delete',
        handler: () => {
          this.products.forEach(el=>{
            if(el.id==this.id)
            {
              this.cateId=el.category_id;
            }
          })
    
          
          this.productSer.delete(this.id).subscribe(res=>{


               var f=new FormData();
              
               f.append("categoryid",this.cateId)
            this.productSer.getAllProductsFromDB("","1",f);
           this.notify.Alert("Success","Category successfully Deleted",2000);
          },
          error=>{
            error.error.error.forEach(element => {
              this.notify.Alert("Error",element,"2000");
            });
          })
        }
      }
    ]
  });

  await alert.present();
}
}
