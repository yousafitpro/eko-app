import { Component, OnInit } from '@angular/core';
import { CustomFieldModel } from '../../models/CustomField.model';
import { brandModel } from 'src/app/modules/shop/models/Brand.model';
import { AuthService } from 'src/app/services/auth.service';
import { CustomefieldService } from '../../services/customefield.service';
import { ProductService } from '../../services/product.service';
import { BrandService } from '../../services/brand.service';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductModel } from 'src/app/modules/shop/models/product.model';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
@Component({
  selector: 'app-myshop-update-product',
  templateUrl: './myshop-update-product.component.html',
  styleUrls: ['./myshop-update-product.component.scss'],
})
export class MyshopUpdateProductComponent implements OnInit {
  clickedImage: string;

  options: CameraOptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
  }

  image;
  imageData;
  AllFields:CustomFieldModel[];
  brands:brandModel[]=[];
  i2isinstallment:any="1";
  i2isonsale:any="1";
  product=new ProductModel();
  id:any;
  issaleonline:any=1;
  status:any=0;
  SelectedImage:File=null;
  public imagePath;
  imgURL: any;
  constructor(
    private FieldSer:CustomefieldService,
    private productSer:ProductService,
    private brandSer:BrandService,
    private route:ActivatedRoute,
    private notify:NotifyService,
    private camera: Camera
  ) {
   }

  ngOnInit() {
     
            this.route.params.subscribe(res=>{
              this.id=res['productId'];
              this.setFormForUpdate();
            })
          // fetching brands
          this.brandSer.AllBrandsDBList.subscribe(res=>{this.brands=res;});
  }
  
  ngAfterContentInit(): void {

    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    $( document ).ready(function() {
      $( "#AddEmpImage" ).mouseover(function() {
       $("#AddEmpImage").animate({
        opacity: 0.25,

      },500);
      });
      $( "#AddEmpImage" ).mouseleave(function() {
        $("#AddEmpImage").animate({
          opacity: 1,
        },100);
      });
      $( "#AddEmpImage" ).click(function() {
        $("#image").click();
      });
      $( "#storage" ).click(function() {
        $("#image").click();
      });
      


  });
  }
  setFormForUpdate()
  {
 
       this.productSer.edit(this.id).subscribe(res=>{  
         var s:any=res;

       
         this.product=s.product;
         this.status=s.product.status;
         this.i2isinstallment=s.product.isinstallment;
         this.i2isonsale=s.product.isonsale;
  
         this.issaleonline=s.product.issaleonline
         this.AllFields=s.product.customfields;
         // this.oldAllFields=s.product.customfields;
       }, error=>{error.error.error.forEach(element =>
      {
        console.log(element);
      } 
       
        )});
      

  }
  captureImage() {
    this.camera.getPicture(this.options).then((imageData) => {
      this.imageData = imageData;
      this.image=(<any>window).Ionic.WebView.convertFileSrc(imageData);
      let  url = 'your REST API url';
      const date = new Date().valueOf();
    
      // Replace extension according to your media type
      const imageName = date+ '.jpeg';
      // call method that creates a blob from dataUri
      const imageBlob = this.dataURItoBlob(this.imageData);
      var tmppath = URL.createObjectURL(imageBlob);

      $("#AddEmpImage").fadeIn("fast").attr('src',tmppath);
      // const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' })
     this.SelectedImage = this.blobToFile(imageBlob,"image.png");


      }, (err) => {
         // Handle error
         alert("error "+JSON.stringify(err))
    });
  }
  public blobToFile = (theBlob: Blob, fileName:string): File => {
    var b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return <File>theBlob;
}
  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
     }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });    
   return blob;
  }
  onSelect(event)
  {
   var tmppath = URL.createObjectURL(event.target.files[0]);
   $("#AddEmpImage").fadeIn("fast").attr('src',tmppath);
   this.SelectedImage=<File>event.target.files[0];
  }

  updateImage(){
    this.notify.presentLoading("Please wait...","bubbles");
    const fd=new FormData();
    fd.append('id',this.id);
    fd.append('image',this.SelectedImage);
    this.productSer.updateImage(fd).subscribe(
      res=>{
        var message;
           message=res;
           this.notify.hideLoading();
           this.notify.Alert("Success","Image Successfully Updated","1000");
          },
    error=>{
      this.notify.hideLoading();
      error.error.error.forEach(element =>{
             this.notify.customTost(element);
    });
    });
   }
update()
{
  this.notify.presentLoading("Please wait...","bubbles");
  var message;
  const fd=new FormData();
  this.AllFields.forEach(el=>{
    var name="#f"+el.id;
    var value=$(name).val().toString();
    fd.append('f'+el.id,value);
  });
  // fd.append('image',this.SelectedImage);
  fd.append('id',this.id);
  fd.append('name',$("#name").val().toString());
  fd.append('shortdescription',$("#shortdes").val().toString());
  fd.append('longdescription',$("#longdes").val().toString());
  fd.append('category_id',this.product.category_id);
  fd.append('brand_id',$("#brand").val().toString());
  fd.append('quantity',$("#quantity").val().toString());
  fd.append('mprice',$("#mprice").val().toString());
  fd.append('rprice',$("#rprice").val().toString());
  fd.append('osl',$("#osl").val().toString());
  fd.append('discount',$("#discount").val().toString());
  fd.append('tax',$("#tax").val().toString());
  fd.append('status',this.status);
  fd.append('issaleonline',this.issaleonline);
  fd.append('isinstallment',this.i2isinstallment.toString());
  fd.append('isonsale',this.i2isonsale.toString());
    this.productSer.update(fd).subscribe(
      res=>{
           message=res;
           this.notify.hideLoading();
    this.notify.Alert("Success","Product Successfully Updated","1000");
          },
    error=>{
      this.notify.hideLoading();
      error.error.error.forEach(element =>{
  this.notify.customTost(element)
    });
    });
}
getCustomFields(cate_id)
{
 this.FieldSer.getAllCustomFieldsFromDB(cate_id,"");
 this.FieldSer.AllCustomFieldDBList.subscribe(res=>{
   this.AllFields=res; 
 });
}
   // required functions
   AddStatus(value)
   {

     if(value==true)
     {
      this.status=0;
     }
     else{
      this.status=1;
     }

   }
   isinstallment(value)
   {
    if(value==true)
    {
     this.i2isinstallment=0;
    }
    else{
     this.i2isinstallment=1;
    }
   }
   isonsale(value)
   {
    if(value==true)
    {
     this.i2isonsale=0;
    }
    else{
     this.i2isonsale=1;
    }
   }
   availebleOnline(value)
   {
    if(value==true)
    {
     this.issaleonline=0;
    }
    else{
     this.issaleonline=1;
    }
   }
}
