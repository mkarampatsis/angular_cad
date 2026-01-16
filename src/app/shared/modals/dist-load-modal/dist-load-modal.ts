import { Component } from '@angular/core';

@Component({
  selector: 'app-dist-load-modal',
  imports: [],
  templateUrl: './dist-load-modal.html',
  styleUrl: './dist-load-modal.css',
})
export class DistLoadModal {
  modalRef: any;
  data!: string;
}
