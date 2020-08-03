import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import { PdfViewerModule} from 'ng2-pdf-viewer';

@Component({
  selector: 'app-viewer3',
  templateUrl: './viewer3.component.html',
  styleUrls: ['./viewer3.component.scss']
})
export class Viewer3Component implements OnInit {
  idr:number;
  title: string;
  closeBtnName: string;
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

}
