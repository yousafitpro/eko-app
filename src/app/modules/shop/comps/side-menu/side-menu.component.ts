import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { MyEnviroment } from 'src/app/GlobalFiles/MyEnviroment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  isLogged:boolean=false;
  user:any;
  constructor(
    private menu: MenuController,
    private authSer:AuthService,
    private router:Router
    ) { }

  ngOnInit() {
    this.authSer.IsLogged.subscribe(res=>this.isLogged=res);
    if(localStorage.getItem('accesseries'))
    {
      this.user=JSON.parse(localStorage.getItem('accesseries'));
    }
  }
  hideMainMenu()
  {
    this.menu.toggle("mainMenu");
  }
  logout()
  {
    this.authSer.logoutUser();
    this.hideMainMenu();
  }
  redirectToRegister(){

  }
  goToSellerMode()
  {
    location.href="/myshop";
  }
}
