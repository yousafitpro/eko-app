import { Component, Input, OnInit } from '@angular/core';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
})
export class ImageViewerComponent implements OnInit {
  @Input() ImageUrl: string;
  constructor(
    private notify:NotifyService
  ) { }

  ngOnInit() {}
close()
{
  this.notify.hideModal();
}
}
