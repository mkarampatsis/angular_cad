import { Component } from '@angular/core';

@Component({
  selector: 'app-sections-modal',
  imports: [],
  templateUrl: './sections-modal.html',
  styleUrl: './sections-modal.css',
})
export class SectionsModal {
  modalRef: any;
  data!: string;
}
