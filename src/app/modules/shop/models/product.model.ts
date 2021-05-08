export class ProductModel {
    "id":any= "";
    "name":any= "";
    "quantity":any= "";
    "mprice":any="";
    "rprice":any="";
    "osl":any='';// out of stock limmit
    "discount":any="";
    "issaleonline":number;
    "isinstallment":number= 0;
    "isonsale":number= 0;
    "tax":any;
    "shortdescription":any;
    "longdescription":any= "";
    "admin":any;
    "sadmin":any;
    "added_by":any;
    "added_by_name":any;
    "status":number;
    "updated_by":any;
    "updated_by_name":any;
    "created_at":any= "2020-04-25T02:08:20.000000Z";
    "updated_at":any= "2020-04-25T02:20:00.000000Z";
    "image":any="";
    "category_id":any="";
    "category_name":any="";
    "brand_id":any="";
    "brand_name":any="";
    "salecount":any=0;
  Selected = new Map();
  }
  export class ProductPaginationModel{
    "current_page":any="";
    "first_page_url":any="";
    "from":any="";
    "last_page":any="";
    "last_page_url":any="";
    "next_page_url":any="";
    "path":any="";
    "per_page":any="";
    "prev_page_url":any="";
    "to":any="";
    "total":any="";
  }
  
  