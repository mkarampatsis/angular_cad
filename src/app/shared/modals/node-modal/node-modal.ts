import { Component } from '@angular/core';

@Component({
  selector: 'app-node-modal',
  imports: [],
  templateUrl: './node-modal.html',
  styleUrl: './node-modal.css',
})
export class NodeModal {
  modalRef: any;
  data!: string;
}
