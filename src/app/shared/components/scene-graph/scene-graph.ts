import { Component, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, inject, effect, computed, } from "@angular/core";
import { extend, NgtArgs } from "angular-three";
import * as THREE from "three";

import { ImportFileService } from '../../../shared/services/import-file.service';

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
  
  // GLB URL signal
  glbUrl = computed(() => {
    const cad = this.importFileService.cadFileSignal();
    return cad?.type === 'glb' ? cad.url : null;
  });
    
  // protected readonly Math = Math;
  protected gltf = gltfResource(() => 'assets/files/Snowy-Village.glb');
  // gltf = gltfResource(() => this.glbUrl() || '');

  object: THREE.Object3D | null = null;

  constructor() {
    effect(async () => {
      const cadFile = this.importFileService.cadFileSignal();

      if (!cadFile) return;

      if (cadFile.type === 'dxf') {
        // this.object = await this.dxfLoader.loadDxf(cadFile.file);
        console.log(cadFile.file)
      }

      if (cadFile.type === 'glb') {
        console.log("glb file", cadFile.url)
        this.object = null;
      }
    });
  }
  
}