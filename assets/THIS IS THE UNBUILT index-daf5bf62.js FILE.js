/*
Cooper Bower
HTML/CSS Capstone Project
August 31, 2023
*/

import '/style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Assuming you've loaded the GLTF model and animations
let mixer;

function newObject(path, id, slider, camY) {
  // Setup
  const scene = new THREE.Scene();

  scene.background = new THREE.Color(0x222222);
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 10);

  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector(id),
    antialias : false,
    powerPreference: "high-performance",
  });

  const parent = document.querySelector(id).parentElement;

  let sliderElement = document.querySelector(slider);

  camera.position.setZ(2);
  camera.position.setX(0);
  camera.position.setY(camY);

  renderer.render(scene, camera);

  //my model

  const loader = new GLTFLoader();

  loader.load(path, function (gltf) {
    var object = gltf.scene;
    object.traverse((node) => {
      if (!node.isMesh) return;
      node.material.wireframe = false;
      node.material.wireframeLinewidth = 0.5;
    });


    const loadedObject = gltf.scene;
    scene.add(loadedObject);


    // Set the initial rotation of the object (in radians)
    loadedObject.rotation.x = 0; // No initial rotation around the X-axis
    loadedObject.rotation.y = 0; // No initial rotation around the Y-axis
    loadedObject.rotation.z = 0; // No initial rotation around the Z-axis


    //const light = new THREE.DirectionalLight(0x404040); // soft white light
    //scene.add(light);

    // Add the object to the scene
    scene.add(loadedObject);

    // Define a function for the animation loop
    function animate() {
      // Rotate the object in each frame
      loadedObject.rotation.x = 0.3;
      loadedObject.rotation.y += 0.01; // Rotate around the Z-axis by 0.01 radians

      let scale = sliderElement.value;

      scale = 2;
      loadedObject.scale.x = scale;
      loadedObject.scale.y = scale;
      loadedObject.scale.z = scale;

      // Render the scene
      renderer.render(scene, camera);

      // Call animate() again on the next frame
      requestAnimationFrame(animate);
    }
    // Start the animation loop
    animate();

  }, undefined, function (error) {
    console.error(error);
  });

  const pointLight = new THREE.DirectionalLight(0xffffff);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  // Animation Loop

  function animate() {
    requestAnimationFrame(animate);

    try {
      camY = sliderElement.value / 100;
    } catch {
      console.log("slider doesnt exist");
    }

    camera.position.setY(camY);

    // controls.update();
    var pixelRatio = 2*(window.innerWidth / window.innerHeight); // Get the device pixel ratio
    // Set the canvas dimensions taking into account the pixel ratio
    //renderer.setSize(window.innerWidth *0.6, window.innerHeight *0.55);
    // Adjust the pixel ratio for rendering
    renderer.setPixelRatio(pixelRatio);
    camera.aspect = (window.innerWidth * 0.6) / (window.innerHeight *0.55);
    camera.updateProjectionMatrix();

    renderer.render(scene, camera);
  }

  animate();

}

function newObject2(path, id, slider, camY, objectPosition) {
  // Setup
  const scene = new THREE.Scene();

  scene.background = new THREE.Color(0x444444);
  const camera = new THREE.PerspectiveCamera(80, document.querySelector(id).innerWidth / document.querySelector(id).innerHeight, 0.1, 10);

  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector(id),
  });

  const parent = document.querySelector(id).parentElement;

  let sliderElement = document.querySelector(slider);

  camera.position.setZ(2);
  camera.position.setX(0);
  camera.position.setY(camY);

  renderer.render(scene, camera);

  //my model

  const loader = new GLTFLoader();

  for (let i = 0; i < path.length; i++) {
    loader.load(path, function (gltf) {
      // Get a reference to the loaded 3D object
      var object = gltf.scene;
      object.traverse((node) => {
        if (!node.isMesh) return;
        node.material.wireframe = true;
        node.material.wireframeLinewidth = 0.5;
      });


      const loadedObject = gltf.scene;

      mixer = new THREE.AnimationMixer(loadedObject);
      const clips = gltf.animations;

      clips.forEach(function(clip){
        const action = mixer.clipAction(clip);
        action.play();
      })

      //const clip = THREE.AnimationClip.findByName(clips, "objectRotateLinear");
      //const action = mixer.clipAction(clip);
      //action.play();

      scene.add(loadedObject);
      loadedObject.position.x = objectPosition[0];
      loadedObject.position.y = objectPosition[1];
      loadedObject.position.z = objectPosition[2];

      //const light = new THREE.DirectionalLight(0x404040); // soft white light
      //scene.add(light);

      // Add the object to the scene
      scene.add(loadedObject);

      const clock = new THREE.Clock();

      // Define a function for the animation loop
      function animate() {
        // Rotate the object in each frame
        //loadedObject.rotation.x = 0.3;
        //loadedObject.rotation.y += 0.01; // Rotate around the Z-axis by 0.01 radians

        mixer.update(clock.getDelta() * 2);

        let scale = 1.4;
        loadedObject.scale.x = scale;
        loadedObject.scale.y = scale;
        loadedObject.scale.z = scale;

        // Render the scene
        renderer.render(scene, camera);

        // Call animate() again on the next frame
        requestAnimationFrame(animate);
      }
      // Start the animation loop
      animate();

    }, undefined, function (error) {
      console.error(error);
    });
  }


  const pointLight = new THREE.DirectionalLight(0xffffff);
  pointLight.position.set(5, 5, 5);

  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(pointLight, ambientLight);

  // Animation Loop

  function animate() {
    requestAnimationFrame(animate);

    try {
      camY = sliderElement.value / 100;
    } catch {
      console.log("slider doesnt exist");
    }

    camera.position.setY(camY);

    // controls.update();
    var pixelRatio = window.devicePixelRatio || 1; // Get the device pixel ratio
    // Set the canvas dimensions taking into account the pixel ratio
    renderer.setSize(parent.offsetWidth * pixelRatio, parent.offsetHeight * pixelRatio);
    // Adjust the pixel ratio for rendering
    renderer.setPixelRatio(pixelRatio);
    camera.aspect = parent.offsetWidth / parent.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(parent.offsetWidth, parent.offsetHeight);

    renderer.render(scene, camera);
  }

  animate();

}

//instatiate oblect models
try {
  newObject('https://cooper-vr.github.io/websiteBuild/assets/3dStuff/swords.gltf', '#bg', '#slider1', 0);
  newObject('https://cooper-vr.github.io/websiteBuild/assets/3dStuff/starKing.glb', '#bh', '#slider2', 2);
  newObject('https://cooper-vr.github.io/websiteBuild/assets/3dStuff/deligate.glb', '#bg2', '#slider3', 2);
  newObject('https://cooper-vr.github.io/websiteBuild/assets/3dStuff/scherzo.glb', '#bh2', '#slider4', 2);
} catch {
  console.log("wrong page")
}
