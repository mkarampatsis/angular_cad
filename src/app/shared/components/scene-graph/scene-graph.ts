import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { extend, NgtArgs } from "angular-three";
import * as THREE from "three";

import { Cube } from "../cube/cube";
extend(THREE);

@Component({
  selector: 'app-scene-graph',
  imports: [Cube, NgtArgs],
  templateUrl: './scene-graph.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SceneGraph {
  protected readonly Math = Math;
}