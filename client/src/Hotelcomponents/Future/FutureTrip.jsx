import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import futureTripCSS from "./FutureTrip.module.css";

// Import your images
import image3 from '@assets/newyork.jpg';
import image2 from '@assets/paris.jpg';
import image1 from '@assets/ski.jpg';
import image4 from '@assets/island.jpg';
import image5 from '@assets/boat.jpg';  
import image6 from '@assets/fingirl.jpg';

function FutureTrip() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    document.getElementById("inspiration").appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0xffffff, 2);
    scene.add(light);

    const loader = new GLTFLoader();
    let airplane, mixer;
    
    loader.load('/cartoon_plane.glb', (gltf) => {
      console.log("Model loaded successfully!");
      airplane = gltf.scene;
      airplane.scale.set(0.3, 0.3, 0.3); // Adjusted scale
      airplane.position.set(0, 3, 0); // Ensure it's above ground
      scene.add(airplane);

      // Play animations if the model has any
      if (gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(airplane);
        gltf.animations.forEach((clip) => {
          mixer.clipAction(clip).play();
        });
      }
    }, undefined, (error) => {
      console.error("Error loading model:", error);
    });

    camera.position.set(0, 3, 15); // Adjust camera

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
    <div className={`${futureTripCSS.FutureTrip_Wrapper} section`} id="inspiration">
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 10 }} />
      <div className={futureTripCSS.FutureTripCards}>
        <div className={futureTripCSS.FutureTripCard}>
          <div className={futureTripCSS.FutureTripCardImage}>
            <img src={image1} alt="Ski Resort" />
          </div>
          <h3>10 European Ski Resorts You Should Visit This Winter</h3>
          <p>jan-06-2024</p>
        </div>
        <div className={futureTripCSS.FutureTripCard}>
          <div className={futureTripCSS.FutureTripCardImage}>
            <img src={image2} alt="Paris" />
          </div>
          <h3>Visiting Best Locations With Us?</h3>
          <p>jan-14-2024</p>
        </div>
        <div className={futureTripCSS.FutureTripCard}>
          <div className={futureTripCSS.FutureTripCardImage}>
            <img src={image3} alt="New York" />
          </div>
          <h3>Where Can I Go? 5 Amazing Countries That Are Open Right Now!</h3>
          <p>jan-06-2024</p>
        </div>
        <div className={futureTripCSS.FutureTripCard}>
          <div className={futureTripCSS.FutureTripCardImage}>
            <img src={image4} alt="Island" />
          </div>
          <h3>Discover Hidden Gems in Canary Island</h3>
          <p>feb-20-2024</p>
        </div>
        <div className={futureTripCSS.FutureTripCard}>
          <div className={futureTripCSS.FutureTripCardImage}>
            <img src={image5} alt="Japan" />
          </div>
          <h3>Explore the Mystical Beauty of Brazil</h3>
          <p>mar-01-2024</p>
        </div>
        <div className={futureTripCSS.FutureTripCard}>
          <div className={futureTripCSS.FutureTripCardImage}>
            <img src={image6} alt="Maldives" />
          </div>
          <h3>Relax in the Finnish breathtaking northern forest</h3>
          <p>apr-15-2024</p>
        </div>
      </div>
    </div>
  );
}

export default FutureTrip;
