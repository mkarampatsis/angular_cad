import { Injectable, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DistLoadModal } from '../modals/dist-load-modal/dist-load-modal';
import { ElementsModal } from '../modals/elements-modal/elements-modal';
import { MaterialsModal } from '../modals/materials-modal/materials-modal';
import { ModelModal } from '../modals/model-modal/model-modal';
import { NodeModal } from '../modals/node-modal/node-modal';
import { PointLoadsModal } from '../modals/point-loads-modal/point-loads-modal';
import { ResultsModal } from '../modals/results-modal/results-modal';
import { SectionsModal } from '../modals/sections-modal/sections-modal';
import { SettingsModal } from '../modals/settings-modal/settings-modal';
import { SupportsModal } from '../modals/supports-modal/supports-modal';

@Injectable({
  providedIn: 'root',
})
export class Modal {
   modalOpen = inject(NgbModal);
   showModelDetails(data: string) {
    const modalRef = this.modalOpen.open(ModelModal, {
      fullscreen: 'lg',
      size: 'xl',
      centered: true,
    });
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.modalRef = modalRef;
  }

  showNodesDetails(data: string) {
    const modalRef = this.modalOpen.open(NodeModal, {
      fullscreen: 'lg',
      size: 'xl',
      centered: true,
    });
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.modalRef = modalRef;
  }

  showMaterialsDetails(data: string) {
    const modalRef = this.modalOpen.open(MaterialsModal, {
      fullscreen: 'lg',
      size: 'xl',
      centered: true,
    });
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.modalRef = modalRef;
  }

  showSectionsDetails(data: string) {
    const modalRef = this.modalOpen.open(SectionsModal, {
      fullscreen: 'lg',
      size: 'xl',
      centered: true,
    });
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.modalRef = modalRef;
  }
  
  showElementsDetails(data: string) {
    const modalRef = this.modalOpen.open(ElementsModal, {
      fullscreen: 'lg',
      size: 'xl',
      centered: true,
    });
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.modalRef = modalRef;
  }

  showSupportsDetails(data: string) {
    const modalRef = this.modalOpen.open(SupportsModal, {
      fullscreen: 'lg',
      size: 'xl',
      centered: true,
    });
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.modalRef = modalRef;
  }

  showPointsLoadsDetails(data: string) {
    const modalRef = this.modalOpen.open(PointLoadsModal, {
      fullscreen: 'lg',
      size: 'xl',
      centered: true,
    });
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.modalRef = modalRef;
  }

  showDistLoadsDetails(data: string) {
    const modalRef = this.modalOpen.open(DistLoadModal, {
      fullscreen: 'lg',
      size: 'xl',
      centered: true,
    });
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.modalRef = modalRef;
  }

  showResultsDetails(data: string) {
    const modalRef = this.modalOpen.open(ResultsModal, {
      fullscreen: 'lg',
      size: 'xl',
      centered: true,
    });
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.modalRef = modalRef;
  }

  showSettingsDetails(data: string) {
    const modalRef = this.modalOpen.open(SettingsModal, {
      fullscreen: 'lg',
      size: 'xl',
      centered: true,
    });
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.modalRef = modalRef;
  }
}
