 
 import * as THREE from "three";
 
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