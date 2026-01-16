import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  viewChild,
  signal,
  input
} from "@angular/core";
import { NgtArgs, beforeRender } from "angular-three";
import * as THREE from "three";

@Component({
  selector: 'app-cube',
  imports: [NgtArgs],
  templateUrl: './cube.html',
  styleUrl: './cube.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Cube {
  positionX = input(0);

  private meshRef = viewChild.required<ElementRef<THREE.Mesh>>('mesh');
  
  protected hovered = signal(false);
  protected clicked = signal(false);

  constructor() {
    beforeRender(({ delta }) => {
      this.meshRef().nativeElement.rotation.y += delta;
    });
  }
}