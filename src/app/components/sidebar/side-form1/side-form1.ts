import { Component, inject, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { DxfLoaderService } from '../../../shared/services/dxf-loader.service';
import { ImportFileService } from '../../../shared/services/import-file.service';

@Component({
  selector: 'app-side-form1',
  imports: [],
  templateUrl: './side-form1.html',
  styleUrl: './side-form1.css',
})
export class SideForm1 {
activeOffcanvas = inject(NgbActiveOffcanvas);
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  importFileService = inject(ImportFileService);
  // dxfLoaderService = inject(DxfLoaderService);
	// @Input() name: string | undefined;

  // File actions
  newFile() { console.log('New File'); }
  // loadFile() { console.log('Load File'); }
  saveFile() { console.log('Save File'); }
  importFile() { 
    console.log('Import DXF'); 
    this.fileInput.nativeElement.click();
  }
  exportScene() { console.log('Export Scene'); }
  publish() { console.log('Publish'); }

  // View actions
  toggleNodeIDs() { console.log('Toggle Node IDs'); }
  toggleBeamIDs() { console.log('Toggle Beam IDs'); }
  toggleColumnIDs() { console.log('Toggle Column IDs'); }
  toggleGrid() { console.log('Toggle Grid'); }

  // Run
  runOptimization() { console.log('Run Optimization'); }

  loadFile(event: Event) { 
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const ext = file.name.split('.').pop()?.toLowerCase();

    if (ext === 'dxf') {
      this.importFileService.cadFileSignal.set({ type: 'dxf', file });
    }

    if (ext === 'glb' || ext === 'gltf') {
      const url = URL.createObjectURL(file);
      this.importFileService.cadFileSignal.set({ type: 'glb', url });
    }

    input.value = '';
  }
}
