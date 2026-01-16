import { effect, Injectable, signal } from '@angular/core';
import * as THREE from 'three';
// import * as ThreeDxf from 'three-dxf';

@Injectable({
  providedIn: 'root'
})
export class DxfLoaderService {

  dxfFile = signal<File | null>(null);

  // async loadDxf(file: File): Promise<THREE.Object3D> {
  //   const text = await file.text();
  //   const parser = new (ThreeDxf as any).Loader();
  //   const dxf = parser.parse(text);
  //   return dxf; // This is a THREE.Group or Scene object
  // }
}
