import { Injectable, signal } from '@angular/core';
import DxfParser from 'dxf-parser'; 
import { INode, IElement,  IDxfLineEntity} from '../components/interfaces/dxf-loader.interface';

@Injectable({
  providedIn: 'root'
})
export class DxfLoaderService {

  dxfFile = signal<File | null>(null);

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
    
    console.log(">>>",allLines);
    // Initialize with first line
    if (allLines.length > 0) {
      console.log("alllines>>",allLines)
      NODES.push(roundNode(allLines[0].vertices[0]));
      NODES.push(roundNode(allLines[0].vertices[0]));
    }

    for (const line of allLines) {
      console.log("line>>",line)
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
}
