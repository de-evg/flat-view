import React, { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { camera } from "../../three/camera/camera";
import { generateFlatTemplate } from "../../three/flat-template/flat-template";
import { generateWall, generateFloor } from "../../three/geometry/geometry";
import { light } from "../../three/light/light";

const K = 2;
const DEFAULT_HEIGHT = 100;
const DEFAULT_Y_POSITION = DEFAULT_HEIGHT / 2;

const Scene = () => {
  let mount = useRef(null);
  const [three, setThreeRenderer] = useState(null);
  const [isDragging, setDragging] = useState(false);

  const handleMouseDown = useCallback(
    (evt) => {
      setDragging(true);
    },
    [setDragging]
  );

  const handleMouseMove = useCallback(
    (evt) => {
      const { geometry, renderer, scene, camera } = three;
      const shift = {
        x: evt.movementX,
        y: evt.movementY,
      };

      const deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(
        new THREE.Euler((K * shift.y) / 360, (K * shift.x) / 360, 0, "XYZ")
      );

      geometry.quaternion.multiplyQuaternions(
        deltaRotationQuaternion,
        geometry.quaternion
      );
      renderer.render(scene, camera);
    },
    [three]
  );

  const handleMouseUp = useCallback(() => {
    three.renderer.domElement.removeEventListener("mousemove", handleMouseMove);
    setDragging(false);
  }, [three, handleMouseMove]);

  useEffect(() => {
    if (three) {
      three.renderer.domElement.addEventListener("mousedown", handleMouseDown);
      return () =>
        three.renderer.domElement.removeEventListener(
          "mousedown",
          handleMouseDown
        );
    }
  }, [three, handleMouseDown]);

  useEffect(() => {
    if (three && isDragging) {
      three.renderer.domElement.addEventListener("mousemove", handleMouseMove);
      return () =>
        three.renderer.domElement.removeEventListener(
          "mousemove",
          handleMouseMove
        );
    }
  }, [three, isDragging, handleMouseMove]);

  useEffect(() => {
    if (three) {
      three.renderer.domElement.addEventListener("mouseup", handleMouseUp);
      return () =>
        three.renderer.domElement.removeEventListener("mouseup", handleMouseUp);
    }
  }, [three, isDragging, handleMouseUp]);

  useEffect(() => {
    if (!three) {
      const scene = new THREE.Scene();
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      mount.appendChild(renderer.domElement);
      const extWallLeft = generateWall(18, DEFAULT_HEIGHT, 340);
      extWallLeft.position.x = -197;
      extWallLeft.position.y = DEFAULT_Y_POSITION;
      extWallLeft.position.z = 33;

      const extWallTop1 = generateWall(35, DEFAULT_HEIGHT, 18);
      extWallTop1.position.x = -175;
      extWallTop1.position.y = DEFAULT_Y_POSITION;
      extWallTop1.position.z = -128;

      const extWallTop2 = generateWall(125, DEFAULT_HEIGHT, 18);
      extWallTop2.position.x = -55;
      extWallTop2.position.y = DEFAULT_Y_POSITION;
      extWallTop2.position.z = -128;

      const extWallTop3 = generateWall(222, DEFAULT_HEIGHT, 18);
      extWallTop3.position.x = 100;
      extWallTop3.position.y = DEFAULT_Y_POSITION;
      extWallTop3.position.z = -145;

      const extWallRight = generateWall(18, DEFAULT_HEIGHT, 358);
      extWallRight.position.x = 218;
      extWallRight.position.y = DEFAULT_Y_POSITION;
      extWallRight.position.z = 25;

      const extWallBottom1 = generateWall(305, DEFAULT_HEIGHT, 18);
      extWallBottom1.position.x = -36;
      extWallBottom1.position.y = DEFAULT_Y_POSITION;
      extWallBottom1.position.z = 194;

      const extWallBottom2 = generateWall(50, DEFAULT_HEIGHT, 4);
      extWallBottom2.position.x = 190;
      extWallBottom2.position.y = DEFAULT_Y_POSITION;
      extWallBottom2.position.z = 202;

      const extWallThin1 = generateWall(4, DEFAULT_HEIGHT, 23);
      extWallThin1.position.x = -3;
      extWallThin1.position.y = DEFAULT_Y_POSITION;
      extWallThin1.position.z = -163;

      const extWallThin2 = generateWall(4, DEFAULT_HEIGHT, 92);
      extWallThin2.position.x = -45;
      extWallThin2.position.y = DEFAULT_Y_POSITION;
      extWallThin2.position.z = -188;
      extWallThin2.rotation.y = 1.23;

      const extWallThin3 = generateWall(140, DEFAULT_HEIGHT, 4);
      extWallThin3.position.x = -158;
      extWallThin3.position.y = DEFAULT_Y_POSITION;
      extWallThin3.position.z = -203;

      const extWallThin4 = generateWall(4, DEFAULT_HEIGHT, 70);
      extWallThin4.position.x = -227;
      extWallThin4.position.y = DEFAULT_Y_POSITION;
      extWallThin4.position.z = -170;

      const extWallThin5 = generateWall(26, DEFAULT_HEIGHT, 4);
      extWallThin5.position.x = -216;
      extWallThin5.position.y = DEFAULT_Y_POSITION;
      extWallThin5.position.z = -135;

      const innerWallMiddle1 = generateWall(9, DEFAULT_HEIGHT, 209);
      innerWallMiddle1.position.x = 10;
      innerWallMiddle1.position.y = DEFAULT_Y_POSITION;
      innerWallMiddle1.position.z = -40;

      const innerWallMiddle2 = generateWall(9, DEFAULT_HEIGHT, 70);
      innerWallMiddle2.position.x = 10;
      innerWallMiddle2.position.y = DEFAULT_Y_POSITION;
      innerWallMiddle2.position.z = 160;

      const innerWallThin1 = generateWall(130, DEFAULT_HEIGHT, 4);
      innerWallThin1.position.x = 150;
      innerWallThin1.position.y = DEFAULT_Y_POSITION;
      innerWallThin1.position.z = -28;

      const innerWallThin2 = generateWall(130, DEFAULT_HEIGHT, 4);
      innerWallThin2.position.x = 150;
      innerWallThin2.position.y = DEFAULT_Y_POSITION;
      innerWallThin2.position.z = 118;

      const innerWallThin3 = generateWall(4, DEFAULT_HEIGHT, 48);
      innerWallThin3.position.x = 84;
      innerWallThin3.position.y = DEFAULT_Y_POSITION;
      innerWallThin3.position.z = -6;

      const innerWallThin4 = generateWall(4, DEFAULT_HEIGHT, 62);
      innerWallThin4.position.x = 84;
      innerWallThin4.position.y = DEFAULT_Y_POSITION;
      innerWallThin4.position.z = 89;

      const innerWallThin5 = generateWall(16, DEFAULT_HEIGHT, 4);
      innerWallThin5.position.x = 77;
      innerWallThin5.position.y = DEFAULT_Y_POSITION;
      innerWallThin5.position.z = 16;

      const innerWallThin6 = generateWall(16, DEFAULT_HEIGHT, 4);
      innerWallThin6.position.x = 22;
      innerWallThin6.position.y = DEFAULT_Y_POSITION;
      innerWallThin6.position.z = 16;
const FLOOR_LEVEL = -1;
      const floor = generateFloor([
        { pos: [-205, FLOOR_LEVEL, -133], norm: [0, 10, 0] }, //0
        { pos: [-205, FLOOR_LEVEL, 200], norm: [0, 10, 0] }, //1
        { pos: [10, FLOOR_LEVEL, -133], norm: [0, 10, 0] }, //2
        { pos: [10, FLOOR_LEVEL, 200], norm: [0, 10, 0] }, //3
        
        { pos: [10, FLOOR_LEVEL, -140], norm: [0, 10, 0] }, //4
        { pos: [218, FLOOR_LEVEL, -140], norm: [0, 10, 0] }, //5
        { pos: [218, FLOOR_LEVEL, 200], norm: [0, 10, 0] }, //6
        { pos: [10, FLOOR_LEVEL, 200], norm: [0, 10, 0] }, //7

        { pos: [-228, FLOOR_LEVEL, -205], norm: [0, 10, 0] }, //8
        { pos: [-228, FLOOR_LEVEL, -133], norm: [0, 10, 0] }, //9
        { pos: [-85, FLOOR_LEVEL, -205], norm: [0, 10, 0] }, //10
        { pos: [-85, FLOOR_LEVEL, -133], norm: [0, 10, 0] }, //11

        { pos: [-85, FLOOR_LEVEL, -172], norm: [0, 10, 0] }, //12
        { pos: [0, FLOOR_LEVEL, -172], norm: [0, 10, 0] }, //13
        { pos: [0, FLOOR_LEVEL, -133], norm: [0, 10, 0] }, //14
        { pos: [-85, FLOOR_LEVEL, -133], norm: [0, 10, 0] }, //15

        { pos: [-85, FLOOR_LEVEL, -205], norm: [0, 10, 0] }, //16
        { pos: [0, FLOOR_LEVEL, -172], norm: [0, 10, 0] }, //17
        { pos: [-85, FLOOR_LEVEL, -172], norm: [0, 10, 0] }, //18
        
      ]);

      const group = new THREE.Group();

      group.add(extWallLeft);
      group.add(extWallTop1);
      group.add(extWallTop2);
      group.add(extWallTop3);
      group.add(extWallRight);
      group.add(extWallBottom1);
      group.add(extWallBottom2);

      group.add(extWallThin1);
      group.add(extWallThin2);
      group.add(extWallThin3);
      group.add(extWallThin4);
      group.add(extWallThin5);

      group.add(innerWallMiddle1);
      group.add(innerWallMiddle2);

      group.add(innerWallThin1);
      group.add(innerWallThin2);
      group.add(innerWallThin3);
      group.add(innerWallThin4);
      group.add(innerWallThin5);
      group.add(innerWallThin6);

      group.add(floor);

      scene.add(group);
      scene.add(light);
      scene.rotation.x = 0.5;
      renderer.render(scene, camera);
      setThreeRenderer({ renderer, geometry: group, scene, camera });
    }
  }, [three, setThreeRenderer]);

  return <div ref={(ref) => (mount = ref)}></div>;
};

export default Scene;
