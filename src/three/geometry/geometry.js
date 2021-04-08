import * as THREE from "three";

const generateWall = (width, height, depth) => {
  const geometry = new THREE.BoxGeometry( width, height, depth );
  const material = new THREE.MeshPhongMaterial( {color: 0x88FF88} );
  const wall = new THREE.Mesh( geometry, material );

  return wall;
};

const generateFloor = (coords) => {
  const vertices = coords.map((coord) => ({ pos: [...coord.pos], norm: [...coord.norm] }));
  const numVertices = vertices.length;
    const positionNumComponents = 3;
    const normalNumComponents = 3;
    const positions = new Float32Array(numVertices * positionNumComponents);
    const normals = new Float32Array(numVertices * normalNumComponents);
    let posNdx = 0;
    let nrmNdx = 0;

    for (const vertex of vertices) {
      positions.set(vertex.pos, posNdx);
      normals.set(vertex.norm, nrmNdx);
      posNdx += positionNumComponents;
      nrmNdx += normalNumComponents;
    }

    const geometry = new THREE.BufferGeometry({side: THREE.DoubleSide});
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, positionNumComponents));
    geometry.setAttribute("normal", new THREE.BufferAttribute(normals, normalNumComponents));

    geometry.setIndex([
      0, 1, 2,  2, 3, 1,
      2, 1, 0,  1, 3, 2,

      4, 5, 6,  6, 7, 4,
      6, 5, 4,  4, 7, 6,

      8, 9, 10,  10, 11, 9,
      10, 9, 8,  9, 11, 10,

      12, 13, 14,  14, 15, 12,
      14, 13, 12,  12, 15, 14,

      16, 17, 18,  18, 17, 16,

    ]);
      
    const material = new THREE.MeshPhongMaterial({ color: 0x88FF88 });
    const floor = new THREE.Mesh(geometry, material);

    return floor;
};

export { generateWall, generateFloor };
