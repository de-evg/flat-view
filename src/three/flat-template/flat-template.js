import * as THREE from "three";

const generateFlatTemplate = (scene) => {

  const handleImgLoad = (img) => {
    const geometry = new THREE.PlaneGeometry(img.width / 2, img.height / 2, 9, 9);
    const texture = new THREE.TextureLoader().load("/img/flat1.png");
    const material = new THREE.MeshLambertMaterial({ map: texture });
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -1.567;
    scene.add(plane);
  };

  var heightmaploader = new THREE.ImageLoader();
  heightmaploader.load("/img/flat1.png", handleImgLoad);
};

export { generateFlatTemplate };
