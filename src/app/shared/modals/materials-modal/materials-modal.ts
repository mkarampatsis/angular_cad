import { Component } from '@angular/core';

@Component({
  selector: 'app-materials-modal',
  imports: [],
  templateUrl: './materials-modal.html',
  styleUrl: './materials-modal.css',
})
export class MaterialsModal {
  modalRef: any;
  data!: string;
}
