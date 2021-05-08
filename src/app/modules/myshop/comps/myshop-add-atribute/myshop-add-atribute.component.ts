import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomefieldService } from '../../services/customefield.service';
import { AuthService } from 'src/app/services/auth.service';
import { CustomFieldModel } from '../../models/CustomField.model';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-myshop-add-atribute',
  templateUrl: './myshop-add-atribute.component.html',
  styleUrls: ['./myshop-add-atribute.component.scss'],
})
export class MyshopAddAtributeComponent implements OnInit {

  autocomplete:any="";
  popover:any;
  cateId:any;
  from=new CustomFieldModel();
  constructor(
    private route:ActivatedRoute,
    private fieldSer:CustomefieldService,
    private notify:NotifyService
  ) { }

  ngOnInit() {

    this.route.params.subscribe(res=>{
      this.cateId=res['cateId'];
    });

    this.setDefault();
  }
  addFieldNow(title,type)
  {
    if(title=="")
    {
      this.notify.customTost("Title is Required");
      return;
    }
    if(type=="")
    {
      this.notify.customTost("Type is Required");
      return;
    }
    this.from.title=title;
    this.from.type=type;
    this.from.categoryid=this.cateId;
    this.notify.presentLoading("Please wait...","bubbles")
    var message;
     this.fieldSer.add(this.from).subscribe(res=>{
      message=res;
      this.notify.hideLoading();
      this.notify.Alert("Success",message.message,2000);
      this.fieldSer.getAllCustomFieldsFromDB(this.cateId,"");
     },error=>{
       this.notify.hideLoading();
      error.error.error.forEach(element =>this.notify.customTost(element));
    })
  }
  AddRequired(v)
  {
    if(v==false)
    {
      this.from.required=1;
    }
    else
    {
      this.from.required=0;
    }
  }
  isshowtousers(v)
  {
    if(v==false)
    {
      this.from.isshowtousers=1;
    }
    else
    {
      this.from.isshowtousers=0;
    }
  }
  AddUnique(v)
  {
    if(v==false)
    {
      this.from.unique=1;
    }
    else
    {
      this.from.unique=0;
    }
  }

  setDefault()
  {
    this.from.unique=0;
    this.from.required=0;
    this.from.isshowtousers=0;
  }
}
