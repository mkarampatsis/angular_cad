import { Injectable, signal } from '@angular/core';
import DxfParser from 'dxf-parser';
import { INode, IElement, IDxfLineEntity } from '../components/interfaces/dxf-loader.interface';

import * as THREE from 'three';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DxfLoaderService {

  private dxfDataSubject = new Subject<{ nodes: INode[]; elements: IElement[] }>(); 
  
  dxfData$ = this.dxfDataSubject.asObservable(); 
  send(nodes: INode[], elements: IElement[]) { 
    this.dxfDataSubject.next({ nodes, elements }); 
  }

  dxfImport(dxfText: string): { nodes: INode[]; elements: IElement[] } {
    const parser = new DxfParser();
    const dxf = parser.parseSync(dxfText) as any;

    if (!dxf) throw new Error("Invalid DXF file");

    const allLines = dxf.entities
      .filter((e: any) => e.type === 'LINE') as unknown as IDxfLineEntity[];

    const prcs = 10;
    const NODES: [number, number, number][] = [];
    const ELMS: [number, number][] = [];

    const roundNode = (pt: any): [number, number, number] => [
      Number(pt.x.toFixed(prcs)),
      Number(pt.y.toFixed(prcs)),
      Number((pt.z ?? 0).toFixed(prcs))
    ];

    // Initialize with first line
    if (allLines.length > 0) {
      NODES.push(roundNode(allLines[0].vertices[0]));
      NODES.push(roundNode(allLines[0].vertices[0]));
    }

    for (const line of allLines) {
      const nodei = roundNode(line.vertices[0]);
      const nodej = roundNode(line.vertices[1]);

      let i = NODES.findIndex(n => n[0] === nodei[0] && n[1] === nodei[1] && n[2] === nodei[2]);
      if (i === -1) {
        NODES.push(nodei);
        i = NODES.length - 1;
      }

      let j = NODES.findIndex(n => n[0] === nodej[0] && n[1] === nodej[1] && n[2] === nodej[2]);
      if (j === -1) {
        NODES.push(nodej);
        j = NODES.length - 1;
      }

      ELMS.push([i + 1, j + 1]);
    }

    // Convert to Node objects
    const nodes: INode[] = NODES.map((n, idx) => ({
      coord_x: n[0],
      coord_y: n[1],
      coord_z: n[2],
      id: idx + 1,
      nn: idx + 1,
      dof_dx: 1,
      dof_dy: 1,
      dof_dz: 1,
      dof_rx: 1,
      dof_ry: 1,
      dof_rz: 1,
    }));

    // Convert to Element objects
    const elements: IElement[] = ELMS.map((e, idx) => ({
      nodei: e[0],
      nodej: e[1],
      id: idx + 1,
      en: idx + 1,
      section_id: 1,
      elem_type: 'beam',
      length: 1,
    }));

    return { nodes, elements };
  }

  drawNodes(nodes: INode[]): THREE.Mesh[] {
    const result: THREE.Mesh[] = [];

    for (let a = 0; a < nodes.length; a++) {
      const node = nodes[a];

      const dofs = [
        node.dof_dx,
        node.dof_dy,
        node.dof_dz,
        node.dof_rx,
        node.dof_ry,
        node.dof_rz,
      ];

      let supported = false;

      for (let j = 0; j < dofs.length; j++) {
        if (dofs[j] === 0) {
          supported = true;
          break;
        }
        // j++
      }

      let mesh: THREE.Mesh;

      if (!supported) {
        // UNSUPPORTED NODE → Sphere
        const geometry = new THREE.SphereGeometry(0.03, 12, 12);
        const material = new THREE.MeshStandardMaterial({
          color: 0x000066,
          emissive: 0x000066,
        });

        mesh = new THREE.Mesh(geometry, material);

        mesh.userData = {
          nn: node.nn,
          type: 'node',
          coord_x: node.coord_x,
          coord_y: node.coord_y,
          coord_z: node.coord_z,
          label_position: new THREE.Vector3(node.coord_y, node.coord_z, node.coord_x),
          dof_dx: 1,
          dof_dy: 1,
          dof_dz: 1,
          dof_rx: 1,
          dof_ry: 1,
          dof_rz: 1,
        };
      } else {
        // SUPPORTED NODE → Box
        const geometry = new THREE.BoxGeometry(0.15, 0.15, 0.15);
        const material = new THREE.MeshStandardMaterial({ color: 0x000066 });

        mesh = new THREE.Mesh(geometry, material);

        mesh.userData = {
          nn: node.nn,
          type: 'node',
          coord_x: node.coord_x,
          coord_y: node.coord_y,
          coord_z: node.coord_z,
          label_position: new THREE.Vector3(node.coord_y, node.coord_z, node.coord_x),
          dof_dx: node.dof_dx,
          dof_dy: node.dof_dy,
          dof_dz: node.dof_dz,
          dof_rx: node.dof_rx,
          dof_ry: node.dof_ry,
          dof_rz: node.dof_rz,
        };

      }

      mesh.name = `Node ${node.nn}`;
      mesh.position.set(node.coord_y, node.coord_z, node.coord_x);

      result.push(mesh);
    }
    return result;
  }

  drawElements(scene: THREE.Scene, elements: IElement[]): THREE.Object3D[] {
    const result: THREE.Object3D[] = [];

    for (let a = 0; a < elements.length; a++) {
      const element = elements[a];

      const node_I = scene.getObjectByName(`Node ${element.nodei}`) as THREE.Mesh;
      const node_J = scene.getObjectByName(`Node ${element.nodej}`) as THREE.Mesh;

      if (!node_I || !node_J) continue;

      const xi = node_I.position.x;
      const yi = node_I.position.y;
      const zi = node_I.position.z;

      const xj = node_J.position.x;
      const yj = node_J.position.y;
      const zj = node_J.position.z;

      // Compute direction and length
      const helpLine = new THREE.Line3(
        new THREE.Vector3(xi, yi, zi),
        new THREE.Vector3(xj, yj, zj)
      );

      const length = helpLine.distance();

      const dirVector = new THREE.Vector3();
      helpLine.delta(dirVector);
      dirVector.normalize();

      const helpVector = new THREE.Vector3(0, 1, 0);

      let zLocal = new THREE.Vector3();
      let yLocal = new THREE.Vector3();

      if (dirVector.x === 0 && dirVector.z === 0) {
        zLocal = new THREE.Vector3(0, 0, 1);
        yLocal = new THREE.Vector3(1, 0, 0);
      } else if (dirVector.y === 0) {
        zLocal.crossVectors(helpVector, dirVector);
        yLocal.crossVectors(dirVector, zLocal);
      } else {
        zLocal.crossVectors(dirVector, helpVector);
        yLocal.crossVectors(dirVector, zLocal);
      }

      const matrixTemp = this.transform(xi, yi, zi, xj, yj, zj, 0, length);

      const dirVector1 = new THREE.Vector3(
        matrixTemp.elements[0],
        matrixTemp.elements[3],
        matrixTemp.elements[6]
      );
      const dirVector2 = new THREE.Vector3(
        matrixTemp.elements[1],
        matrixTemp.elements[4],
        matrixTemp.elements[7]
      );
      const dirVector3 = new THREE.Vector3(
        matrixTemp.elements[2],
        matrixTemp.elements[5],
        matrixTemp.elements[8]
      );

      const transformMatrix = new THREE.Matrix4();
      transformMatrix.makeBasis(dirVector1, dirVector2, dirVector3);
      transformMatrix.setPosition(new THREE.Vector3(xi, yi, zi));

      // Line geometry
      const positions = [0, 0, 0, length, 0, 0];
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(positions, 3)
      );

      const line = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({ color: 0x404040 })
      );

      line.name = `Element ${element.en}`;

      const xm = (xi + xj) / 2;
      const ym = (yi + yj) / 2;
      const zm = (zi + zj) / 2;

      line.userData = {
        en: element.en,
        type: 'element',
        nodei: node_I.userData['nn'],
        nodej: node_J.userData['nn'],
        elem_type: 'beam',
        length,
        section_id: element.section_id,
        fixity_dx_i: 0,
        fixity_dy_i: 0,
        fixity_dz_i: 0,
        fixity_rx_i: 0,
        fixity_ry_i: 0,
        fixity_rz_i: 0,
        fixity_dx_j: 0,
        fixity_dy_j: 0,
        fixity_dz_j: 0,
        fixity_rx_j: 0,
        fixity_ry_j: 0,
        fixity_rz_j: 0,
        label_position: new THREE.Vector3(xm, ym, zm),
        xLocal: dirVector1,
        yLocal: dirVector2,
        zLocal: dirVector3,
      };

      line.applyMatrix4(transformMatrix);

      result.push(line);
    }

    return result;
  }

  transform(
    xi: number,
    yi: number,
    zi: number,
    xj: number,
    yj: number,
    zj: number,
    bt: number,
    length: number
  ): THREE.Matrix3 {
    const mt3 = new THREE.Matrix3();

    const xl = xj - xi;
    const yl = yj - yi;
    const zl = zj - zi;

    const cx = xl / length;
    const cy = yl / length;
    const cz = zl / length;

    const coa = Math.cos(bt);
    const sia = -Math.sqrt((1 - coa) ** 2);

    const up = Math.sqrt(cx * cx + cz * cz);

    let m11: number, m12: number, m13: number;
    let m21: number, m22: number, m23: number;
    let m31: number, m32: number, m33: number;

    if (up !== 0) {
      m11 = cx;
      m12 = cy;
      m13 = cz;

      m21 = (-cx * cy * coa - cz * sia) / up;
      m22 = up * coa;
      m23 = (-cy * cz * coa + cx * sia) / up;

      m31 = (cx * cy * sia - cz * coa) / up;
      m32 = -up * sia;
      m33 = (cy * cz * sia + cx * coa) / up;
    } else {
      m11 = 0;
      m12 = cy;
      m13 = 0;

      m21 = -cy * coa;
      m22 = 0;
      m23 = sia;

      m31 = cy * sia;
      m32 = 0;
      m33 = coa;
    }

    mt3.set(
      m11, m12, m13,
      m21, m22, m23,
      m31, m32, m33
    );

    return mt3;
  }
}
