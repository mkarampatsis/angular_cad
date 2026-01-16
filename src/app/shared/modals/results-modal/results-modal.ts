import { Component } from '@angular/core';

@Component({
  selector: 'app-results-modal',
  imports: [],
  templateUrl: './results-modal.html',
  styleUrl: './results-modal.css',
})
export class ResultsModal {
  modalRef: any;
  data!: string;
}
