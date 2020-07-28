import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import { PdfViewerModule} from 'ng2-pdf-viewer';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {
  
  id:number;  
  title: string;
  closeBtnName: string;
  
 
  constructor(public bsModalRef: BsModalRef) {}
 
  ngOnInit() {
    

  }
  
}

