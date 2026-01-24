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
  @ViewChild('fileInputDXF') fileInputDXF!: ElementRef<HTMLInputElement>;

  importFileService = inject(ImportFileService);
  dxfLoaderService = inject(DxfLoaderService);
	// @Input() name: string | undefined;

  // File actions
  newFile() { console.log('New File'); }
  // loadFile() { console.log('Load File'); }
  saveFile() { console.log('Save File'); }
  importFile() { 
    console.log('Import File'); 
    this.fileInput.nativeElement.click();
  }
  importDXF() { 
    console.log('Import DXF'); 
    this.fileInputDXF.nativeElement.click();
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

    if (ext === 'stl') {
      const url = URL.createObjectURL(file);
      this.importFileService.cadFileSignal.set({ type: 'stl', url });
    }

    if (ext === 'obj') {
      const url = URL.createObjectURL(file);
      this.importFileService.cadFileSignal.set({ type: 'obj', url });
    }

    input.value = '';
  }

  loadDXF(event: Event){
    const input = event.target as HTMLInputElement; 
    const file = input.files?.[0]; 
    if (!file) return; 

    const reader = new FileReader(); 
    reader.onload = () => { 
      const dxfText = reader.result as string; 
      const { nodes, elements } = this.dxfLoaderService.dxfImport(dxfText); 
      console.log("Node>>",nodes);
      console.log("Elements>>",elements);
      // drawNodes(this.editor, nodes); 
      // drawElements(this.editor, elements); 
    }; 
    
    reader.readAsText(file); 
  }
}

