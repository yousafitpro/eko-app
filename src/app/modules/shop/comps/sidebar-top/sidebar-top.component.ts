import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-sidebar-top',
  templateUrl: './sidebar-top.component.html',
  styleUrls: ['./sidebar-top.component.scss'],
})
export class SidebarTopComponent implements OnInit {
  isLogged:boolean=false;
  user:any;
  constructor(
      private authSer:AuthService,
  ) { }

  ngOnInit() {
       this.authSer.IsLogged.subscribe(res=>this.isLogged=res);
    if(localStorage.getItem('user'))
    {
      this.user=JSON.parse(localStorage.getItem('user'));
    }
  }

}
