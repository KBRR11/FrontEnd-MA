import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import { PdfViewerModule} from 'ng2-pdf-viewer';

@Component({
  selector: 'app-viewer2',
  templateUrl: './viewer2.component.html',
  styleUrls: ['./viewer2.component.scss']
})
export class Viewer2Component implements OnInit {
  id:number;  
  title: string;
  closeBtnName: string;
  
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

}
