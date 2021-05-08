import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomefieldService } from '../../services/customefield.service';
import { CustomFieldModel } from '../../models/CustomField.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-myshop-category-attributes',
  templateUrl: './myshop-category-attributes.component.html',
  styleUrls: ['./myshop-category-attributes.component.scss'],
})
export class MyshopCategoryAttributesComponent implements OnInit {
  isLoading:Boolean=false;
  autocomplete:any="";
  popover:any;
  fields:CustomFieldModel[]=[];
  cateId:any;
  constructor(
    private route:ActivatedRoute,
    private fieldSer:CustomefieldService,
    private authSer:AuthService,
    private notify:NotifyService,
    public alertController: AlertController,
  ) {
    this.authSer.isLoading.subscribe(res=>{this.isLoading=res});
   }

  ngOnInit() {
    this.route.params.subscribe(res=>{
      this.cateId=res['cateId'];
      this.fieldSer.getAllCustomFieldsFromDB(res['cateId'],"")
      this.fieldSer.AllCustomFieldDBList.subscribe(res=>this.fields=res)
    })
  }
  keupsearch()
  {
    if(this.autocomplete=="")
    {
      this.fieldSer.getAllCustomFieldsFromDB(this.cateId,this.autocomplete);
    }
  }
  delete(id)
  {
    this.presentAlertConfirm(id)

  }
  search()
  {
    if(this.autocomplete!="")
    {
      this.fieldSer.getAllCustomFieldsFromDB(this.cateId,this.autocomplete);
    }
  }
  refresh()
  {
    this.fieldSer.getAllCustomFieldsFromDB(this.cateId,this.autocomplete);
  }
  async presentAlertConfirm(id) {

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
            var message:any;
            this.fieldSer.delete(id).subscribe(res=>{
              message=res;
              this.notify.Alert("Success",message.message,2000);
              this.fieldSer.getAllCustomFieldsFromDB(this.cateId,"");
             },error=>{error.error.error.forEach(element =>this.notify.customTost(element));
            })
          }
        }
      ]
    });
  
    await alert.present();
  }
}
