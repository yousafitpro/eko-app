import { Component, OnInit, Input } from '@angular/core';
import { NotifyService } from 'src/app/services/notify.service';
@Component({
  selector: 'app-cop-url',
  templateUrl: './cop-url.component.html',
  styleUrls: ['./cop-url.component.scss'],
})
export class CopURLComponent implements OnInit {
  @Input() Url: string;
  constructor(
    private notify:NotifyService,
  ) { }

  ngOnInit() {}
  hideModal(){

  this.notify.customTost("Copied");
  this.notify.hideModal();
  }
}
