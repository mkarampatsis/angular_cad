import { Component } from "@angular/core";
import { Sidebar } from '../sidebar/sidebar';
import { NgtCanvas } from "angular-three/dom";
import { SceneGraph } from "../../shared/components/scene-graph/scene-graph";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as THREE from 'three';

@Component({
  selector: 'app-cad-scene',
  imports: [Sidebar, NgtCanvas, SceneGraph],
  templateUrl: './cad-scene.html',
  styleUrl: './cad-scene.css',
})
export class CadScene {
  camera = new THREE.PerspectiveCamera(60, 1, 0.1, 10000);
  controls!: OrbitControls;

   onCreated({ camera, gl }: { camera: THREE.Camera; gl: THREE.WebGLRenderer }) {
    this.controls = new OrbitControls(camera, gl.domElement);

    this.controls.enableRotate = true;
    this.controls.enablePan = true;
    this.controls.enableZoom = true;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;

    // CAD-style mouse mapping
    this.controls.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.PAN,
    };

    camera.position.set(10, 10, 10);
    this.controls.target.set(0, 0, 0);
    this.controls.update();
  }
}
