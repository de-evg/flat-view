import * as THREE from "three";

const DEFAULT_EXT = 1;
const DEFAULT_INNER = 0.5;
const DEFAULT_HEIGHT = 5;

const WallPoint = {
  ext: {
    x: DEFAULT_EXT,
    y: DEFAULT_HEIGHT,
    z: DEFAULT_EXT
  },
  inner: {
    x: DEFAULT_INNER,
    y: DEFAULT_HEIGHT,
    z: DEFAULT_INNER
  }
};

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

const vertices = [
  //front wall
  //front
  { pos: [-WallPoint.ext.x, -WallPoint.ext.y, WallPoint.ext.z], norm: [0, 0, 4] }, //vert: 0, index: 0
  { pos: [WallPoint.ext.x, -WallPoint.ext.y, WallPoint.ext.z], norm: [0, 0, 4] }, //vert: 1, index: 1
  { pos: [-WallPoint.ext.x, WallPoint.ext.y, WallPoint.ext.z], norm: [0, 0, 4] }, //vert: 2, index: 2  
  { pos: [WallPoint.ext.x, WallPoint.ext.y, WallPoint.ext.z], norm: [0, 0, 4] }, //vert: 3, index: 3 
  //back
  { pos: [-WallPoint.inner.x, -WallPoint.inner.y, WallPoint.inner.z], norm: [0, 0, 3.5] }, //vert: 4, index: 4
  { pos: [WallPoint.inner.x, -WallPoint.inner.y, WallPoint.inner.z], norm: [0, 0, 3.5] }, //vert: 5, index: 5
  { pos: [-WallPoint.inner.x, WallPoint.inner.y, WallPoint.inner.z], norm: [0, 0, 3.5] }, //vert: 6, index: 6  
  { pos: [WallPoint.inner.x, WallPoint.inner.y, WallPoint.inner.z], norm: [0, 0, 3.5] }, //vert: 7, index: 7  

  //left wall
  //front
  { pos: [-WallPoint.ext.x, -WallPoint.ext.y, -WallPoint.ext.z], norm: [-4, 0, 0] }, //vert: 8, index: 8
  { pos: [-WallPoint.ext.x, -WallPoint.ext.y, WallPoint.ext.z], norm: [-4, 0, 0] }, //vert: 9, index: 9
  { pos: [-WallPoint.ext.x, WallPoint.ext.y, WallPoint.ext.z], norm: [-4, 0, 0] }, //vert: 10, index: 10  
  { pos: [-WallPoint.ext.x, WallPoint.ext.y, -WallPoint.ext.z], norm: [-4, 0, 0] }, //vert: 11, index: 11

  //back
  { pos: [-WallPoint.inner.x, -WallPoint.inner.y, -WallPoint.inner.z], norm: [-3.5, 0, 0] }, //vert: 12, index: 12
  { pos: [-WallPoint.inner.x, -WallPoint.inner.y, WallPoint.inner.z], norm: [-3.5, 0, 0] }, //vert: 13, index: 13 
  { pos: [-WallPoint.inner.x, WallPoint.inner.y, WallPoint.inner.z], norm: [-3.5, 0, 0] }, //vert: 14, index: 14  
  { pos: [-WallPoint.inner.x, WallPoint.inner.y, -WallPoint.inner.z], norm: [-3.5, 0, 0] }, //vert: 15, index: 15

  //back wall
  //front
  { pos: [WallPoint.ext.x, -WallPoint.ext.y, -WallPoint.ext.z], norm: [0, 0, -4] }, //vert: 16, index: 16
  { pos: [-WallPoint.ext.x, -WallPoint.ext.y, -WallPoint.ext.z], norm: [0, 0, -4] }, //vert: 17, index: 17
  { pos: [-WallPoint.ext.x, WallPoint.ext.y, -WallPoint.ext.z], norm: [0, 0, -4] }, //vert: 18, index: 18
  { pos: [WallPoint.ext.x, WallPoint.ext.y, -WallPoint.ext.z], norm: [0, 0, -4] }, //vert: 19, index: 19

  //back
  { pos: [WallPoint.inner.x, -WallPoint.inner.y, -WallPoint.inner.z], norm: [0, 0, -3.5] }, //vert: 20, index: 20
  { pos: [-WallPoint.inner.x, -WallPoint.inner.y, -WallPoint.inner.z], norm: [0, 0, -3.5] }, //vert: 21, index: 21
  { pos: [-WallPoint.inner.x, WallPoint.inner.y, -WallPoint.inner.z], norm: [0, 0, -3.5] }, //vert: 22, index: 22
  { pos: [WallPoint.inner.x, WallPoint.inner.y, -WallPoint.inner.z], norm: [0, 0, -3.5] }, //vert: 23, index: 23
  
  //right wall
  //front
  { pos: [WallPoint.ext.x, -WallPoint.ext.y, -WallPoint.ext.z], norm: [4, 0, 0] }, //vert: 24, index: 24
  { pos: [WallPoint.ext.x, -WallPoint.ext.y, WallPoint.ext.z], norm: [4, 0, 0] }, //vert: 25, index: 25
  { pos: [WallPoint.ext.x, WallPoint.ext.y, WallPoint.ext.z], norm: [4, 0, 0] }, //vert: 26, index: 26  
  { pos: [WallPoint.ext.x, WallPoint.ext.y, -WallPoint.ext.z], norm: [4, 0, 0] }, //vert: 27, index: 27

  //back
  { pos: [WallPoint.inner.x, -WallPoint.inner.y, -WallPoint.inner.z], norm: [3.5, 0, 0] }, //vert: 28, index: 28
  { pos: [WallPoint.inner.x, -WallPoint.inner.y, WallPoint.inner.z], norm: [3.5, 0, 0] }, //vert: 29, index: 29
  { pos: [WallPoint.inner.x, WallPoint.inner.y, WallPoint.inner.z], norm: [3.5, 0, 0] }, //vert: 30, index: 30 
  { pos: [WallPoint.inner.x, WallPoint.inner.y, -WallPoint.inner.z], norm: [3.5, 0, 0] }, //vert: 31, index: 31

  //top-front
  { pos: [-WallPoint.ext.x, WallPoint.inner.y, WallPoint.ext.z], norm: [0, 1, 0] }, //vert: 0, index: 32
  { pos: [-WallPoint.inner.x, WallPoint.inner.y, WallPoint.inner.z], norm: [0, 1, 0] }, //vert: 1, index: 33
  { pos: [WallPoint.inner.x, WallPoint.inner.y, WallPoint.inner.z], norm: [0, 1, 0] }, //vert: 2, index: 34  
  { pos: [WallPoint.ext.x, WallPoint.inner.y, WallPoint.ext.z], norm: [0, 1, 0] }, //vert: 3, index: 35
  { pos: [WallPoint.inner.x, WallPoint.inner.y, WallPoint.ext.z], norm: [0, 1, 0] }, //vert: 4, index: 36
  { pos: [-WallPoint.inner.x, WallPoint.inner.y, WallPoint.ext.z], norm: [0, 1, 0] }, //vert: 5, index: 37

  //bottom-front
  { pos: [-WallPoint.ext.x, -WallPoint.inner.y, WallPoint.ext.z], norm: [0, -1, 0] }, //vert: 0, index: 38
  { pos: [-WallPoint.inner.x, -WallPoint.inner.y, WallPoint.inner.z], norm: [0, -1, 0] }, //vert: 1, index: 39
  { pos: [WallPoint.inner.x, -WallPoint.inner.y, WallPoint.inner.z], norm: [0, -1, 0] }, //vert: 2, index: 40  
  { pos: [WallPoint.ext.x, -WallPoint.inner.y, WallPoint.ext.z], norm: [0, -1, 0] }, //vert: 3, index: 41
  { pos: [WallPoint.inner.x, -WallPoint.inner.y, WallPoint.ext.z], norm: [0, -1, 0] }, //vert: 4, index: 42
  { pos: [-WallPoint.inner.x, -WallPoint.inner.y, WallPoint.ext.z], norm: [0, -1, 0] }, //vert: 5, index: 43

  //top-back
  { pos: [-WallPoint.ext.x, WallPoint.inner.y, -WallPoint.ext.z], norm: [0, 1, 0] }, //vert: 0, index: 44
  { pos: [-WallPoint.inner.x, WallPoint.inner.y, -WallPoint.inner.z], norm: [0, 1, 0] }, //vert: 1, index: 45
  { pos: [WallPoint.inner.x, WallPoint.inner.y, -WallPoint.inner.z], norm: [0, 1, 0] }, //vert: 2, index: 46  
  { pos: [WallPoint.ext.x, WallPoint.inner.y, -WallPoint.ext.z], norm: [0, 1, 0] }, //vert: 3, index: 47
  { pos: [WallPoint.inner.x, WallPoint.inner.y, -WallPoint.ext.z], norm: [0, 1, 0] }, //vert: 4, index: 48
  { pos: [-WallPoint.inner.x, WallPoint.inner.y, -WallPoint.ext.z], norm: [0, 1, 0] }, //vert: 5, index: 49
  
  //bottom-back
  { pos: [-WallPoint.ext.x, -WallPoint.inner.y, -WallPoint.ext.z], norm: [0, -1, 0] }, //vert: 0, index: 50
  { pos: [-WallPoint.inner.x, -WallPoint.inner.y, -WallPoint.inner.z], norm: [0, -1, 0] }, //vert: 1, index: 51
  { pos: [WallPoint.inner.x, -WallPoint.inner.y, -WallPoint.inner.z], norm: [0, -1, 0] }, //vert: 2, index: 52  
  { pos: [WallPoint.ext.x, -WallPoint.inner.y, -WallPoint.ext.z], norm: [0, -1, 0] }, //vert: 3, index: 53
  { pos: [WallPoint.inner.x, -WallPoint.inner.y, -WallPoint.ext.z], norm: [0, -1, 0] }, //vert: 4, index: 54
  { pos: [-WallPoint.inner.x, -WallPoint.inner.y, -WallPoint.ext.z], norm: [0, -1, 0] }, //vert: 5, index: 55

  //top-left
  { pos: [-WallPoint.ext.x, WallPoint.inner.y, WallPoint.ext.z], norm: [0, 1, 0] }, //vert: 0, index: 56
  { pos: [-WallPoint.inner.x, WallPoint.inner.y, WallPoint.inner.z], norm: [0, 1, 0] }, //vert: 1, index: 57
  { pos: [-WallPoint.inner.x, WallPoint.inner.y, -WallPoint.inner.z], norm: [0, 1, 0] }, //vert: 2, index: 58  
  { pos: [-WallPoint.ext.x, WallPoint.inner.y, -WallPoint.ext.z], norm: [0, 1, 0] }, //vert: 3, index: 59
  { pos: [-WallPoint.ext.x, WallPoint.inner.y, -WallPoint.inner.z], norm: [0, 1, 0] }, //vert: 4, index: 60
  { pos: [-WallPoint.ext.x, WallPoint.inner.y, WallPoint.inner.z], norm: [0, 1, 0] }, //vert: 5, index: 61
   
  //bottom-left
  { pos: [-WallPoint.ext.x, -WallPoint.inner.y, WallPoint.ext.z], norm: [0, -1, 0] }, //vert: 0, index: 62
  { pos: [-WallPoint.inner.x, -WallPoint.inner.y, WallPoint.inner.z], norm: [0, -1, 0] }, //vert: 1, index: 63
  { pos: [-WallPoint.inner.x, -WallPoint.inner.y, -WallPoint.inner.z], norm: [0, -1, 0] }, //vert: 2, index: 64  
  { pos: [-WallPoint.ext.x, -WallPoint.inner.y, -WallPoint.ext.z], norm: [0, -1, 0] }, //vert: 3, index: 65
  { pos: [-WallPoint.ext.x, -WallPoint.inner.y, -WallPoint.inner.z], norm: [0, -1, 0] }, //vert: 4, index: 66
  { pos: [-WallPoint.ext.x, -WallPoint.inner.y, WallPoint.inner.z], norm: [0, -1, 0] }, //vert: 5, index: 67

  //top-right
  { pos: [WallPoint.ext.x, WallPoint.inner.y, WallPoint.ext.z], norm: [0, 1, 0] }, //vert: 0, index: 68
  { pos: [WallPoint.inner.x, WallPoint.inner.y, WallPoint.inner.z], norm: [0, 1, 0] }, //vert: 1, index: 69
  { pos: [WallPoint.inner.x, WallPoint.inner.y, -WallPoint.inner.z], norm: [0, 1, 0] }, //vert: 2, index: 70  
  { pos: [WallPoint.ext.x, WallPoint.inner.y, -WallPoint.ext.z], norm: [0, 1, 0] }, //vert: 3, index: 71
  { pos: [WallPoint.ext.x, WallPoint.inner.y, -WallPoint.inner.z], norm: [0, 1, 0] }, //vert: 4, index: 72
  { pos: [WallPoint.ext.x, WallPoint.inner.y, WallPoint.inner.z], norm: [0, 1, 0] }, //vert: 5, index: 73
   
  //bottom-right
  { pos: [WallPoint.ext.x, -WallPoint.inner.y, WallPoint.ext.z], norm: [0, -1, 0] }, //vert: 0, index: 74
  { pos: [WallPoint.inner.x, -WallPoint.inner.y, WallPoint.inner.z], norm: [0, -1, 0] }, //vert: 1, index: 75
  { pos: [WallPoint.inner.x, -WallPoint.inner.y, -WallPoint.inner.z], norm: [0, -1, 0] }, //vert: 2, index: 76  
  { pos: [WallPoint.ext.x, -WallPoint.inner.y, -WallPoint.ext.z], norm: [0, -1, 0] }, //vert: 3, index: 77
  { pos: [WallPoint.ext.x, -WallPoint.inner.y, -WallPoint.inner.z], norm: [0, -1, 0] }, //vert: 4, index: 78
  { pos: [WallPoint.ext.x, -WallPoint.inner.y, WallPoint.inner.z], norm: [0, -1, 0] }, //vert: 5, index: 79

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
 6, 5, 4,  7, 5, 6,

 8, 9, 10,  10, 11, 8,
 14, 13, 12,  12, 15, 14,

 17, 19, 16,  18, 19, 17,
 22, 21, 20,  23, 22, 20,

 26, 25, 24,  24, 27, 26,
 28, 29, 30,  30, 31, 28,

 32, 37, 33,  33, 37, 36,  33, 36, 34,  34, 36, 35,
 38, 39, 43,  39, 40, 43,  40, 42, 43,  40, 41, 42,

 45, 49, 44,  48, 49, 45,  46, 48, 45,  47, 48, 46,
 55, 51, 50,  55, 52, 51,  55, 54, 52,  54, 53, 52,

 56, 57, 61,  57, 58, 61,  58, 60, 61,  58, 59, 60,
 66, 63, 62,  67, 64, 63,  67, 66, 64,  66, 65, 64,
 
 72, 69, 68,  73, 70, 69,  73, 72, 70,  72, 71, 70,
 74, 75, 78,  75, 76, 79,  76, 78, 79,  76, 77, 78,
]);

const material = new THREE.MeshPhongMaterial({ color: 0x88FF88 });

const cube = new THREE.Mesh(geometry, material);

export { cube };
