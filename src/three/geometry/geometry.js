import * as THREE from "three";

// const geometry = new THREE.BoxGeometry(2, 1, 0.1);
// const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
// const wallLeft = new THREE.Mesh(geometry, material);
// wallLeft.position.set(-1, 0, 0);
// wallLeft.rotation.y = Math.PI / 2;
// const wallRight = new THREE.Mesh(geometry, material);
// wallRight.rotation.y = Math.PI / 2;
// wallRight.position.set(1, 0, 0);
// const wallFar = new THREE.Mesh(geometry, material);
// wallFar.position.set(0, 0, -1);

// const wallNear = new THREE.Mesh(geometry, material);
// wallNear.position.set(0, 0, 1);
// cube.rotation.x = Math.PI / 4;
// cube.rotation.y = Math.PI / 4;

// const walls = new THREE.Group();
// walls.add(wallLeft);
// walls.add(wallRight);
// walls.add(wallFar);
// walls.add(wallNear);
// export { walls };

// const MAX_POINTS = 5;

const getHeightData = (img) => {
  const canvas = document.createElement("canvas");
  canvas.width = 2048 / 8;
  canvas.height = 2048 / 8;
  const context = canvas.getContext("2d");

  const size = ((2048 / 8) * 2048) / 8,
    data = new Float32Array(size);

  context.drawImage(img, 0, 0);

  for (let i = 0; i < size; i++) {
    data[i] = 0;
  }

  const imgd = context.getImageData(0, 0, 2048 / 8, 2048 / 8);
  const pix = imgd.data;

  let j = 0;
  for (let i = 0, n = pix.length; i < n; i += 4) {
    var all = pix[i] + pix[i + 1] + pix[i + 2];
    data[j++] = all / 40;
  }

  return data;
};

var heightmaploader = new THREE.ImageLoader();
heightmaploader.load("/img/flat.png", getHeightData);

// const vertices = [
//   // front
//   { pos: [-1, -1,  1], norm: [ 0,  0,  1],  }, // 0
//   { pos: [ 1, -1,  1], norm: [ 0,  0,  1],  }, // 1
//   { pos: [-1,  1,  1], norm: [ 0,  0,  1],  }, // 2
//   { pos: [ 1,  1,  1], norm: [ 0,  0,  1],  }, // 3
//   // right
//   { pos: [ 1, -1,  1], norm: [ 1,  0,  0]}, // 4
//   { pos: [ 1, -1, -1], norm: [ 1,  0,  0] }, // 5
//   { pos: [ 1,  1,  1], norm: [ 1,  0,  0] }, // 6
//   { pos: [ 1,  1, -1], norm: [ 1,  0,  0]}, // 7
//   // back
//   { pos: [ 1, -1, -1], norm: [ 0,  0, -1] }, // 8
//   { pos: [-1, -1, -1], norm: [ 0,  0, -1] }, // 9
//   { pos: [ 1,  1, -1], norm: [ 0,  0, -1]}, // 10
//   { pos: [-1,  1, -1], norm: [ 0,  0, -1]}, // 11
//   // left
//   { pos: [-1, -1, -1], norm: [-1,  0,  0] }, // 12
//   { pos: [-1, -1,  1], norm: [-1,  0,  0] }, // 13
//   { pos: [-1,  1, -1], norm: [-1,  0,  0] }, // 14
//   { pos: [-1,  1,  1], norm: [-1,  0,  0] }, // 15
//   // top
//   { pos: [ 1,  1, -1], norm: [ 0,  1,  0] }, // 16
//   { pos: [-1,  1, -1], norm: [ 0,  1,  0] }, // 17
//   { pos: [ 1,  1,  1], norm: [ 0,  1,  0] }, // 18
//   { pos: [-1,  1,  1], norm: [ 0,  1,  0] }, // 19
//   // bottom
//   { pos: [ 1, -1,  1], norm: [ 0, -1,  0] }, // 20
//   { pos: [-1, -1,  1], norm: [ 0, -1,  0] }, // 21
//   { pos: [ 1, -1, -1], norm: [ 0, -1,  0] }, // 22
//   { pos: [-1, -1, -1], norm: [ 0, -1,  0] }, // 23
// ];

const vertices = [
  //front
  { pos: [-1, -1, 1], norm: [0, 0, 1] }, //vert: 0, index: 0
  { pos: [1, -1, 1], norm: [0, 0, 1] }, //vert: 1, index: 1
  { pos: [-1, 1, 1], norm: [0, 0, 1] }, //vert: 2, index: 2  
  { pos: [1, 1, 1], norm: [0, 0, 1] }, //vert: 3, index: 3 
  
  //back
  { pos: [1, -1, -1], norm: [0, 0, -1] }, //vert: 4, index: 4
  { pos: [-1, -1, -1], norm: [0, 0, -1] }, //vert: 5, index: 5
  { pos: [-1, 1, -1], norm: [0, 0, -1] }, //vert: 6, index: 6
  { pos: [1, 1, -1], norm: [0, 0, -1] }, //vert: 7, index: 7

  //left
  { pos: [-1, -1, -1], norm: [-1, 0, 0] }, //vert: 5, index: 8
  { pos: [-1, -1, 1], norm: [-1, 0, 0] }, //vert: 0, index: 9
  { pos: [-1, 1, 1], norm: [-1, 0, 0] }, //vert: 3, index: 10  
  { pos: [1, 1, -1], norm: [-1, 0, 0] }, //vert: 7, index: 11
  
  //right
  { pos: [1, -1, 1], norm: [1, 0, 0] }, //vert: 1, index: 12
  { pos: [1, -1, -1], norm: [1, 0, 0] }, //vert: 4, index: 13
  { pos: [1, 1, 1], norm: [1, 0, 0] }, //vert: 3, index: 14  
  { pos: [-1, 1, -1], norm: [1, 0, 0] }, //vert: 6, index: 15  

  //top
  { pos: [-1, 1, 1], norm: [0, 1, 0] }, //vert: 2, index: 16  
  { pos: [1, 1, 1], norm: [0, 1, 0] }, //vert: 3, index: 17 
  { pos: [1, 1, -1], norm: [0, 1, 0] }, //vert: 7, index: 18
  { pos: [-1, 1, -1], norm: [0, 1, 0] }, //vert: 6, index: 19

  //bottom
  { pos: [-1, -1, -1], norm: [0, -1, 0] }, //vert: 5, index: 20
  { pos: [1, -1, -1], norm: [0, -1, 0] }, //vert: 4, index: 21
  { pos: [-1, -1, 1], norm: [0, -1, 0] }, //vert: 0, index: 22
  { pos: [1, -1, 1], norm: [0, -1, 0] }, //vert: 1, index: 23
];

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

const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", new THREE.BufferAttribute(positions, positionNumComponents));
geometry.setAttribute("normal", new THREE.BufferAttribute(normals, normalNumComponents));

geometry.setIndex([
 0, 1, 2,  2, 1, 3,
 4, 5, 6,  6, 5, 7,
 8, 9, 10,  10, 9, 11,
 12, 13, 14,  14, 13, 15,
 16, 17, 18,  18, 17, 19,
 20, 21, 22,  22, 21, 23
]);

// geometry.setIndex([
//   0,  1,  2,   2,  1,  3,  // front
//   4,  5,  6,   6,  5,  7,  // right
//   8,  9, 10,  10,  9, 11,  // back
//  12, 13, 14,  14, 13, 15,  // left
//  16, 17, 18,  18, 17, 19,  // top
//  20, 21, 22,  22, 21, 23,  // bottom
// ]);

const material = new THREE.MeshPhongMaterial({ color: 0x88FF88 });

const cube = new THREE.Mesh(geometry, material);

export { cube };
