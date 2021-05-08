import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpSpinnerInterCInterceptor } from 'src/app/intercepters/http-spinner-interC.interceptor';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import {IonicStorageModule} from '@ionic/Storage';
import { AuthService } from './services/auth.service';
import { TokenSerService } from './services/token-ser.service';
import { Camera } from '@ionic-native/camera/ngx';
// import { JwtModule } from "@auth0/angular-jwt";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationViewerComponent } from './modules/SharedComps/location-viewer/location-viewer.component';
export function tokenGetter() {
  return localStorage.getItem("access_token");
}
@NgModule({
  declarations: [
    
    AppComponent,
  // Shared COmps
  LocationViewerComponent
  ],
  entryComponents: [],
  imports: [
       HttpClientModule,
      BrowserModule,
     IonicModule.forRoot(),
     IonicStorageModule.forRoot(),
    //  JwtModule.forRoot({
    //   config: {
    //     tokenGetter: tokenGetter,
    //     authScheme: "Basic ",
    //     whitelistedDomains: ["www.ucsonday.online"],
    //     blacklistedRoutes: ["http://www.ucsonday.online/*"],
    //   },
    // }),
      AppRoutingModule,
    ],
  providers: [
    Geolocation,
    Camera,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HttpSpinnerInterCInterceptor, multi: true },
    , Storage
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
  ){
 
  }
}
