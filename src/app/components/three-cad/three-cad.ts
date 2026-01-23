import { 
  Component,
  ElementRef, 
  ViewChild, 
  AfterViewInit, 
  OnDestroy 
} from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-three-cad',
  imports: [Sidebar],
  templateUrl: './three-cad.html',
  styleUrl: './three-cad.css',
})
export class ThreeCad {
   @ViewChild('canvas', { static: true }) 
   canvasRef!: ElementRef<HTMLCanvasElement>; 

   private controls!: OrbitControls;
   
   private renderer!: THREE.WebGLRenderer; 
   private scene!: THREE.Scene; 
   private camera!: THREE.PerspectiveCamera; 
   private animationId!: number; 
   
   ngAfterViewInit() { 
    this.initScene(); 
    this.startRenderingLoop(); 
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
}
