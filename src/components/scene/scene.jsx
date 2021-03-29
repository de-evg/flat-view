import React, {useCallback, useEffect, useRef, useState} from "react";
import * as THREE from "three";
import {camera} from "../../three/camera/camera";
import {generateFlat, generateInnerWall} from "../../three/geometry/geometry";
import {light} from "../../three/light/light";

const K = 2;

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
      const {geometry, renderer, scene, camera} = three;
      const shift = {
        x: evt.movementX,
        y: evt.movementY,
      };

      const deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(K * shift.y / 360, K * shift.x / 360, 0, "XYZ")
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
      const renderer = new THREE.WebGLRenderer({antialias: true});
      renderer.setSize(window.innerWidth, window.innerHeight);
      mount.appendChild(renderer.domElement);
      const flat = generateFlat();
      flat.rotation.x = 0.5;
      const innerWall1 = generateInnerWall(1, 4, 38);
      innerWall1.rotation.x = 0.5;

      const innerWall2 = generateInnerWall(28, 4, 1);
      innerWall2.rotation.x = 0.5;

      const group = new THREE.Group();
      group.add( flat );
      group.add( innerWall1 );
      group.add( innerWall2 );
      scene.add(group);
      scene.add(light);
      renderer.render(scene, camera);
      setThreeRenderer({renderer, geometry: group, scene, camera});
    }
  }, [three, setThreeRenderer]);

  return <div ref={(ref) => (mount = ref)}></div>;
};

export default Scene;
