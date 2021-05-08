import { Component, OnInit } from '@angular/core';
import { CustomFieldModel } from '../../models/CustomField.model';
import { ActivatedRoute } from '@angular/router';
import { CustomefieldService } from '../../services/customefield.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-myshop-update-atribute',
  templateUrl: './myshop-update-atribute.component.html',
  styleUrls: ['./myshop-update-atribute.component.scss'],
})
export class MyshopUpdateAtributeComponent implements OnInit {


  autocomplete:any="";
  popover:any;
  cateId:any;
  id:any;
  required:number=0;
  unique:number=0;
  isshowtousers:number=0;

  from=new CustomFieldModel();
  constructor(
    private route:ActivatedRoute,
    private fieldSer:CustomefieldService,

    private notify:NotifyService
  ) { }

  ngOnInit() {

    this.route.params.subscribe(res=>{
      this.cateId=res['cateId'];
      this.id=res['id'];
      this.fieldSer.edit(this.id).subscribe(res=>{
        var r:any=res;
        this.from=r.customfield[0];
        if(this.from.unique==1)
        {
          this.unique=1;
        }
        if(this.from.required==1)
        {
          this.required=1;
        }
        if(this.from.isshowtousers==1)
        {
          this.isshowtousers=1;
        }

      },error=>{error.error.error.forEach(element =>this.notify.customTost(element));
      })
    });


  }
  updateFieldNow(title,type)
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
    this.notify.presentLoading("Please wait...","bubbles")
    this.from.id=this.id;
    this.from.title=title;
    this.from.type=type;
    this.from.categoryid=this.cateId;
    var message;
     this.fieldSer.update(this.from).subscribe(res=>{
       this.notify.hideLoading();
      message=res;
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
  addisshowtousers(v)
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
