import { Component } from "@angular/core";
import { Sidebar } from '../sidebar/sidebar';
import { NgtCanvas } from "angular-three/dom";
import { SceneGraph } from "../../shared/components/scene-graph/scene-graph";

@Component({
  selector: 'app-cad-scene',
  imports: [Sidebar, NgtCanvas, SceneGraph],
  templateUrl: './cad-scene.html',
  styleUrl: './cad-scene.css',
})
export class CadScene {

}
