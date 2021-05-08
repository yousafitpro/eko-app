import { Component, OnInit, Input } from '@angular/core';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  @Input() id:any;
  @Input() error:any;
  @Input() statusText:any;
  @Input() message:any;
  constructor(
    private notify:NotifyService
  ) {
   
   }

  ngOnInit() {}
  close(){
this.notify.hideModal();
  }
}
