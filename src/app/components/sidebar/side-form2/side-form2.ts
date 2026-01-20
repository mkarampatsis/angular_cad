import { Component, inject, Input } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../../../shared/services/modal.service';

@Component({
  selector: 'app-side-form2',
  imports: [],
  templateUrl: './side-form2.html',
  styleUrl: './side-form2.css',
})
export class SideForm2 {
@Input() name: string | undefined;

  activeOffcanvas = inject(NgbActiveOffcanvas);
  modalService = inject(ModalService);

  openModal(modal: string) {
    switch (modal) {
      case "Model":
        console.log("Model");
        this.modalService.showModelDetails("Model Details");
        break;
      case "Nodes":
        console.log("Nodes");
        this.modalService.showNodesDetails("Node Details");
        break;
      case "Materials":
        console.log("Materials");
        this.modalService.showMaterialsDetails("Materials Details");
        break;
      case "Sections":
        console.log("Sections");
        this.modalService.showSectionsDetails("Sections Details");
        break;
      case "Elements":
        console.log("Elements");
        this.modalService.showElementsDetails("Element Details");
        break;
      case "Supports":
        console.log("Supports");
        this.modalService.showSupportsDetails("Support Details");
        break;
      case "Point Loads":
        console.log("Point Loads");
        this.modalService.showPointsLoadsDetails("Points Loads Details");
        break;
      case "Dist Loads":
        console.log("Dist Loads");
        this.modalService.showDistLoadsDetails("Dist Loads");
        break;
      case "Results":
        console.log("Results");
        this.modalService.showResultsDetails("Results Details");
        break;  
      default:
        console.log("Settings");
        this.modalService.showSettingsDetails("Settings Details");
    }
  }
}
