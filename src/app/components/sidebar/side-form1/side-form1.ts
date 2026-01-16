import { Component, inject, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { DxfLoaderService } from '../../../shared/services/dxf-loader.service';

@Component({
  selector: 'app-side-form1',
  imports: [],
  templateUrl: './side-form1.html',
  styleUrl: './side-form1.css',
})
export class SideForm1 {
activeOffcanvas = inject(NgbActiveOffcanvas);
  @ViewChild('dxfInput') dxfInput!: ElementRef<HTMLInputElement>;

  // dxfLoaderService = inject(DxfLoaderService);
	// @Input() name: string | undefined;

  // File actions
  newFile() { console.log('New File'); }
  loadFile() { console.log('Load File'); }
  saveFile() { console.log('Save File'); }
  importDxf() { 
    console.log('Import DXF'); 
    this.dxfInput.nativeElement.click();
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

  loadDXF(event: Event) { 
    const input = event.target as HTMLInputElement; 
    const file = input.files?.[0]; 
    if (!file) return; 
    const reader = new FileReader(); 
    reader.onload = () => { 
      const dxfText = reader.result as string;
      // your DXF loading logic here
      // this.dxfLoaderService.dxfFile.set(file);
    }; 
    reader.readAsText(file); 
  }
}
