import { Component } from '@angular/core';

@Component({
  selector: 'app-model-modal',
  imports: [],
  templateUrl: './model-modal.html',
  styleUrl: './model-modal.css',
})
export class ModelModal {
  modalRef: any;
  data!: string;
}
