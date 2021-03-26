import * as THREE from "three";

const FIRST_COLOR = 0xFFFFFF;
const SECOND_COLOR = 0x080820;
const INTENSITY = 1;
const light = new THREE.HemisphereLight(FIRST_COLOR, SECOND_COLOR, INTENSITY);
light.position.set(0, 50, 0);

export { light };
