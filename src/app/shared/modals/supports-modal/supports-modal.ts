import { Component } from '@angular/core';

@Component({
  selector: 'app-supports-modal',
  imports: [],
  templateUrl: './supports-modal.html',
  styleUrl: './supports-modal.css',
})
export class SupportsModal {
  modalRef: any;
  data!: string;
}
