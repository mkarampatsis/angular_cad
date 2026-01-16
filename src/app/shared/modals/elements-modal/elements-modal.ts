import { Component } from '@angular/core';

@Component({
  selector: 'app-elements-modal',
  imports: [],
  templateUrl: './elements-modal.html',
  styleUrl: './elements-modal.css',
})
export class ElementsModal {
  modalRef: any;
  data!: string;
}
