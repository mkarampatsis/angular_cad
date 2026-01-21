import { Component, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, inject, effect, computed, signal, } from "@angular/core";
import { extend, NgtArgs } from "angular-three";
import * as THREE from "three";

import { ImportFileService } from '../../../shared/services/import-file.service';
import { STLLoader, OBJLoader } from 'three-stdlib';
import { loaderResource } from "angular-three";

import DxfParser from 'dxf-parser';

// import { Cube } from "../cube/cube";
import { NgtsCameraControls } from "angular-three-soba/controls";
import { gltfResource } from "angular-three-soba/loaders";
import { NgtsCenter, NgtsEnvironment } from "angular-three-soba/staging";

// import snowyVillage from "../../../../assets/files/Snowy-Village.glb" with { loader: "file" };

extend(THREE);

@Component({
  selector: 'app-scene-graph',
  imports: [NgtArgs, NgtsCameraControls, NgtsEnvironment, NgtsCenter],
  templateUrl: './scene-graph.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SceneGraph {
  
  importFileService = inject(ImportFileService);

  dxfObjects = signal<THREE.Object3D[]>([]);

  // GLB URL signal
  glbUrl = computed(() => {
    const cad = this.importFileService.cadFileSignal();
    return cad?.type === 'glb' ? cad.url : null;
  });

  // STL URL signal
  stlUrl = loaderResource(
    () => STLLoader,
    () => {
      const cad = this.importFileService.cadFileSignal();
      return cad?.type === 'stl'? cad.url : '';
    }
  );

  // OBJ URL signal
  objUrl = loaderResource(
    () => OBJLoader,
    () => {
      const cad = this.importFileService.cadFileSignal();
      return cad?.type === 'obj'? cad.url : ''
    }
  );
    
  // protected readonly Math = Math;
  protected gltf2 = gltfResource(() => 'assets/files/Snowy-Village.glb');
  gltf = gltfResource(() => this.glbUrl() || '');

  object: THREE.Object3D | null = null;

  constructor() {
    effect(async () => {
      const cadFile = this.importFileService.cadFileSignal();

      if (!cadFile) return;

      if (cadFile.type === 'dxf') {
        // this.object = await this.dxfLoader.loadDxf(cadFile.file);
        this.loadDxf(cadFile.file);
      }

      if (cadFile.type === 'glb' || cadFile.type ==='stl' || cadFile.type ==='obj') {
        console.log("file", cadFile.url)
        this.object = null;
      }
    });
  }

  private async loadDxf(file: File) {
    const text = await file.text();
    const parser = new DxfParser();
    const dxf = parser.parseSync(text);

    if (!dxf || !dxf.entities) {
      console.warn('Invalid or empty DXF file');
      this.dxfObjects.set([]);
      return;
    }

    const objects: THREE.Object3D[] = [];
    console.log(dxf)
    for (const entity of dxf.entities) {
      if (entity.type === 'LINE') {
        objects.push(this.createLine(entity));
      }
    }
    
    this.dxfObjects.set(objects);
    console.log(this.dxfObjects().length);
    console.log(this.dxfObjects());
  }

  private createLine(entity: any): THREE.Line {
    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(entity.start.x, entity.start.y, 0),
      new THREE.Vector3(entity.end.x, entity.end.y, 0),
    ]);

    const material = new THREE.LineBasicMaterial({ color: 0x000000 });

    return new THREE.Line(geometry, material);
  }
  
}