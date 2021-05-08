export class ShopProductModel {
    "id":any;
    "name":any= "";
    "sadmin":any= "";
    "rprice":any;
    "discount":any;
    "tax":any;
    "shortdescription":any= "";
    "status":number;
    "image":any="";
    "category_id":any="";
    "category_name":any="";
    "brand_id":any="";
    "brand_name":any="";
    "issaleonline":number;
    "isinstallment":number= 0;
    "isonsale":number= 0;
  }
  export class ShopPaginationModel{
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
  export class ShopsPaginationModel{
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
  export class ShopModel {
    "id":any="";
    "sadmin":any="";
  "companyname":any="";
  "companyaddress":any="";
  "companyphone":any="";
  "owner_name":any="";
  "owner_email":any="";
  "shopemail":any="";
  "mobile":any="";
  'latitude':any="0";
  'longitude':any="0";
  }
  export class ShopLocationModel {
    'accuracy':any="0";
    'altitude':any="0";
    'altitudeAccuracy':any="0";
    'heading':any="0";
    'latitude':any="0";
    'longitude':any="0";
    'speed':any="0";
  }