export class MyEnviroment{

    // public static baseUrl:any="http://www.ucsonday.online/public/api/";
    
    public static appUrlP2:any="";
    public static webUrl="http://ekob.online/#/";
    public static AppVersionDate:any="2020-09-07";
    public static AppID:any="001";


    public static afterLoginUrl="http://localhost/product/eko-app/"
    public static afterLogoutUrl="http://localhost/product/eko-app/"
    public static refreshURL="http://localhost/product/eko-app/"
    // public static coreDomain:any="http://127.0.0.1:8000";
    // public static baseUrl:any=MyEnviroment.coreDomain+"/api/"; 
    // public static coreISS:any=MyEnviroment.coreDomain+"/api/auth/login";
    
    // http://core1.ekob.online/public/api/
    public static coreDomain:any="http://localhost/product/eko-api";
    public static baseUrl:any=MyEnviroment.coreDomain+"/public/api/";
    public static coreISS:any=MyEnviroment.coreDomain+"/public/api/auth/login";
    
    }