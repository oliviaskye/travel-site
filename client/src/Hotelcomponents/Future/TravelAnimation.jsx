import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import styled from "styled-components";

const FutureTripWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;  
  height: 80%;
  z-index: 10;
  pointer-events: none;
`;

function TravelAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    document.getElementById("inspiration").appendChild(renderer.domElement);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    let airplane, mixer;

    loader.load(
      "/assets/images/cartoon_plane.glb",
      (gltf) => {
        airplane = gltf.scene;

        airplane.scale.set(1.5, 1.5, 1.5);
        camera.position.set(0, 5, 20); // إبعاد الكاميرا لرؤية أفضل

        airplane.position.set(0, 3, 0);
        scene.add(airplane);

        if (gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(airplane);
          gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play();
          });
        }
      },
      undefined,
      (error) => {
        console.error("Error loading model:", error);
      }
    );

    camera.position.set(0, 3, 15);

    const clock = new THREE.Clock();
    let angle = 0;
    const radius = 3;
    const speed = 0.02;

    const animate = () => {
      requestAnimationFrame(animate);

      if (mixer) mixer.update(clock.getDelta());

      if (airplane) {
        airplane.position.x = Math.cos(angle) * radius;
        airplane.position.z = Math.sin(angle) * radius;
        angle += speed;
        airplane.rotation.y = -angle;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      document.getElementById("inspiration").removeChild(renderer.domElement);
    };
  }, []);

  return (
    <FutureTripWrapper id="inspiration">
      <Canvas ref={canvasRef} />
    </FutureTripWrapper>
  );
}

export default TravelAnimation;
