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
   private animationId!: number; 
   
   ngAfterViewInit() { 
    this.initScene(); 
    this.startRenderingLoop(); 

    // Listen for DXF data 
    this.dxfLoaderService.dxfData$
      .subscribe(({ nodes, elements }) => { 
        this.loadModel(nodes, elements); 
      });

    window.addEventListener('resize', this.onResize); 
  } 
  ngOnDestroy() { 
    cancelAnimationFrame(this.animationId); 
    window.removeEventListener('resize', this.onResize); 
    this.renderer.dispose(); 
  } 
  
  private initScene() { 
    const canvas = this.canvasRef.nativeElement; 
        
    // Scene 
    this.scene = new THREE.Scene(); 
    this.scene.background = new THREE.Color(0xeeeeee); 
    
    // Camera 
    const width = canvas.clientWidth; 
    const height = canvas.clientHeight; 
    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000); 
    this.camera.position.set(3, 3, 3); 
    
    // Renderer 
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, }); 
    this.renderer.setSize(width, height); 
    this.renderer.setPixelRatio(window.devicePixelRatio); 
    
    // OrbitControls 
    this.controls = new OrbitControls(this.camera, this.renderer.domElement); 
    this.controls.enableDamping = true;

    // Example object 
    const geometry = new THREE.BoxGeometry(1, 1, 1); 
    const material = new THREE.MeshStandardMaterial({ color: 0x0077ff }); 
    const cube = new THREE.Mesh(geometry, material); 
    this.scene.add(cube); 
    
    // Light 
    const light = new THREE.DirectionalLight(0xffffff, 1); 
    light.position.set(5, 5, 5); 
    this.scene.add(light); 
  } 
  
  private startRenderingLoop = () => { 
    this.animationId = requestAnimationFrame(this.startRenderingLoop); 

    this.controls.update();
    this.renderer.render(this.scene, this.camera); 
  }; 
  
  private onResize = () => { 
    const canvas = this.canvasRef.nativeElement; 
    const width = canvas.clientWidth; 
    const height = canvas.clientHeight; 
    this.camera.aspect = width / height; 
    this.camera.updateProjectionMatrix(); 
    this.renderer.setSize(width, height); 
  };

  private loadModel(nodes: INode[], elements: IElement[]) { 
    // 1. Create node meshes 
    const nodeMeshes = this.dxfLoaderService.drawNodes(nodes); 
    nodeMeshes.forEach(mesh => this.scene.add(mesh)); 
    // 2. Create element meshes 
    const elementMeshes = this.dxfLoaderService.drawElements(this.scene, elements); 
    elementMeshes.forEach(mesh => this.scene.add(mesh)); 
    // 3. Optional: auto-fit camera 
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
