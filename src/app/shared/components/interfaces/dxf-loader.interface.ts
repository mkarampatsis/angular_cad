export interface INode {
  coord_x: number;
  coord_y: number;
  coord_z: number;
  id: number;
  nn: number;
  dof_dx: number;
  dof_dy: number;
  dof_dz: number;
  dof_rx: number;
  dof_ry: number;
  dof_rz: number;
}

export interface IElement {
  nodei: number;
  nodej: number;
  id: number;
  en: number;
  section_id: number;
  elem_type: string;
  length: number;
}

export interface IDxfLineEntity { 
  type: 'LINE'; 
  vertices: [ 
    { x: number; y: number; z?: number }, 
    { x: number; y: number; z?: number } 
  ];
}