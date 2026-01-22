import { Component, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, inject, effect, computed, signal, } from "@angular/core";
import { extend, NgtArgs } from "angular-three";
import * as THREE from "three";

import { ImportFileService } from '../../../shared/services/import-file.service';
import { STLLoader, OBJLoader } from 'three-stdlib';
import { loaderResource } from "angular-three";

import DxfParser from 'dxf-parser';
import type { ILineEntity, ILwpolylineEntity  } from 'dxf-parser';

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

  dxfGroup = signal<THREE.Group | null>(null);

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

    if (!dxf?.entities?.length) {
      console.warn('Invalid or empty DXF');
      this.dxfGroup.set(null);
      return;
    }

    const group = new THREE.Group();
    console.log("DXF>>",dxf)
    for (const entity of dxf.entities) {
      switch (entity.type) {
        case 'LINE': {
          const line = entity as ILineEntity;
          if (line.vertices.length >= 2) {
            group.add(this.createLine(line));
          }
          break;
        }

        case 'LWPOLYLINE': {
          const poly = entity as ILwpolylineEntity;
          group.add(this.createPolyline(poly));
          break;
        }
      }
    }

    // 🔑 center + scale
    const box = new THREE.Box3().setFromObject(group);
    const size = new THREE.Vector3();
    box.getSize(size);

    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 10 / maxDim; // normalize size

    group.scale.setScalar(scale);
    box.getCenter(group.position).multiplyScalar(-1);

    this.dxfGroup.set(group);
  }

  private createLine(entity: ILineEntity): THREE.Line {
    const points = entity.vertices.map((v: any) =>
      new THREE.Vector3(v.x, v.y, v.z ?? 0)
    );

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    return new THREE.Line(
      geometry,
      new THREE.LineBasicMaterial({ color: 0x111111 })
    );
  }

  private createPolyline(entity: ILwpolylineEntity): THREE.Line {
    const points = entity.vertices.map(v =>
      new THREE.Vector3(v.x, v.y, v.z ?? 0)
    );

    // Check if polyline is closed
    const isClosed = !!entity.shape; // <-- important fix
    if (isClosed && points.length > 2) {
      points.push(points[0].clone());
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    return new THREE.Line(
      geometry,
      new THREE.LineBasicMaterial({ color: 0x2563eb })
    );
  }

}