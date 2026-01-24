import { 
  Component,
  ElementRef, 
  ViewChild, 
  AfterViewInit, 
  OnDestroy, 
  inject
} from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DxfLoaderService } from '../../shared/services/dxf-loader.service';
import { IElement, INode } from '../../shared/components/interfaces/dxf-loader.interface';

@Component({
  selector: 'app-three-cad',
  imports: [Sidebar],
  templateUrl: './three-cad.html',
  styleUrl: './three-cad.css',
})
export class ThreeCad {
   @ViewChild('canvas', { static: true }) 
   canvasRef!: ElementRef<HTMLCanvasElement>; 

   dxfLoaderService = inject(DxfLoaderService);

   private controls!: OrbitControls;
   
   private renderer!: THREE.WebGLRenderer; 
   private scene!: THREE.Scene; 
   private camera!: THREE.PerspectiveCamera; 
   private modelGroup = new THREE.Group();
   private animationId!: number; 
   private resizeObserver!: ResizeObserver;
   
  ngAfterViewInit() { 
    this.initScene(); 
    this.startRenderingLoop(); 

    this.loadModel([], []);

    // Listen for DXF data 
    this.dxfLoaderService.dxfData$
      .subscribe(({ nodes, elements }) => { 
        this.loadModel(nodes, elements); 
      });

    const parent = this.canvasRef.nativeElement.parentElement!; 
    this.resizeObserver = new ResizeObserver(() => { 
      this.onResize(); 
    }); 
    this.resizeObserver.observe(parent);
  } 

  ngOnDestroy() { 
    cancelAnimationFrame(this.animationId); 
    this.renderer.dispose(); 
  }

  private initScene() {
    const canvas = this.canvasRef.nativeElement;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xeeeeee);

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    this.camera.position.set(3, 3, 3);

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    this.scene.add(light);

    // Add empty model container
    this.modelGroup = new THREE.Group();
    this.scene.add(this.modelGroup);
  }

  private clearModel() {
    while (this.modelGroup.children.length > 0) {
      const child = this.modelGroup.children.pop()!;

      // If child is a Mesh or Line, dispose geometry/material
      if (child instanceof THREE.Mesh || child instanceof THREE.Line) {
        child.geometry.dispose();

        if (Array.isArray(child.material)) {
          child.material.forEach(m => m.dispose());
        } else {
          child.material.dispose();
        }
      }
    }
  }

  
  private startRenderingLoop = () => { 
    this.animationId = requestAnimationFrame(this.startRenderingLoop); 

    this.controls.update();
    this.renderer.render(this.scene, this.camera); 
  }; 
  
  private onResize() {
    const canvas = this.canvasRef.nativeElement;
    const parent = canvas.parentElement!;
    const width = parent.clientWidth;
    const height = parent.clientHeight;

    // Prevent infinite loop: only resize if size actually changed
    const currentWidth = this.renderer.domElement.width;
    const currentHeight = this.renderer.domElement.height;

    if (width === currentWidth && height === currentHeight) {
      return; // no change → no resize → no loop
    }

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  private loadModel(nodes: INode[], elements: IElement[]) {
    this.clearModel();

    // If no DXF loaded → show cube
    if (!nodes.length) {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
      const cube = new THREE.Mesh(geometry, material);
      this.modelGroup.add(cube);
      return;
    }

    // DXF exists → draw nodes
    const nodeMeshes = this.dxfLoaderService.drawNodes(nodes);
    nodeMeshes.forEach(m => this.modelGroup.add(m));

    // DXF exists → draw elements
    const elementMeshes = this.dxfLoaderService.drawElements(this.scene, elements);
    elementMeshes.forEach(m => this.modelGroup.add(m));

    this.fitCameraToScene(); 
  }


  private fitCameraToScene() {
    const box = new THREE.Box3().setFromObject(this.scene);
    const size = box.getSize(new THREE.Vector3()).length();
    const center = box.getCenter(new THREE.Vector3());

    this.controls.target.copy(center);
    this.camera.position.copy(center);
    this.camera.position.x += size / 2;
    this.camera.position.y += size / 2;
    this.camera.position.z += size / 2;
    this.camera.updateProjectionMatrix();
  }
}
