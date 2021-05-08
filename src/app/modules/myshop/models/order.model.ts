export class OrderModel{
  "id":any= 5;
  "discount":any=0;
  "tax":any=0;
  "total":any=0;
  "payment":any=0;
  "products":any=0;
  "admin":any= 1;
  "sadmin":any= 2;
  "shop_email":any;
  "added_by":any= 2;
  "added_by_name":any= 2;
  "customer_id":any="";
  "customer_id_name":any="";
  "status":number= 0;
  "paid_payment":any= 0;
  "isselfadded":any= 0;
  "remaining_payment":any= 0;
  "paid":any= "false";
  "pending":any= "true";
  "installment": any="true";
  "cash":any="0";
  "khata":any ="false";
  "updated_by":any= 0;
  "updated_by_name":any= 0;
  "created_at":any= "2020-04-25T02:08:20.000000Z";
  "updated_at":any= "2020-04-25T02:20:00.000000Z";
Selected = new Map();
}
export class orderPaginationModel{
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
