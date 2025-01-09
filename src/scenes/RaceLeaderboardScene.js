import * as THREE from 'three';

import { createRacerMesh } from '../components/RacerMesh.js';
import { createTableHeaderMesh } from '../components/TableHeaderMesh.js';
import { tableConfigurations } from '../constants/tableConfigurations.js';
import { getRace } from '../data/leaderboardData.js';
import { updateRacerVisibility } from '../services/animations/racerVisibility.js';
import { sceneResize } from "../utils/windowResize.js";
import getBrandingSettings from '../utils/getBrandingSettings.js';
import { updateRacers } from '../utils/updateRacers.js';

export async function createRaceLeaderboardScene() {
  // *** INITIALIZE SCENE ***
  const scene = new THREE.Scene();
  scene.name = 'leaderboardScene';
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 8;
  const renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById("app").appendChild(renderer.domElement);
  const config = tableConfigurations.fullRace;
  const branding = getBrandingSettings();
  const location = branding.location;

  // Load the background image
  const loader = new THREE.TextureLoader();
  loader.load("images/racing_track.jpg", function (texture) {
    scene.background = texture;
  });

  // *** SCENE VARIABLES ***
  let maxVisibleRacers = 15;
  const tablePositionY = 4;
  const headerGap = 0.8;
  const mesh_type = 'header';

  // *** CREATE HEADER MESH ***
  const tableHeader = createTableHeaderMesh(mesh_type, config.headers, 6, branding);
  tableHeader.position.set(0, tablePositionY, 0);
  scene.add(tableHeader);

  // *** CREATE RACER MESHES ***
  const racers = await getRace(location);
  const Objects = await createRacerMesh(
    racers,
    tableConfigurations.fullRace.fields,
    tableConfigurations.fullRace.nameFormat,
    false,
    tablePositionY,
    headerGap,
    branding,           
  );
  const racerGroup = Objects[0];
  const totalRacers = Objects[1];
  const racerHeight = Objects[2];
  scene.add(racerGroup);

  // *** HANDLE SCROLLING ***
  const minY = tableHeader.position.y - headerGap; // Top limit
  const maxY = (totalRacers - maxVisibleRacers) * racerHeight + tablePositionY; // Bottom limit
  let targetY = racerGroup.position.y; // Initialize target position
  let currentY = racerGroup.position.y; // Track current position for smooth transition
  let isAnimating = false; // Flag to check if animation is ongoing

  // Function to animate the scrolling
  function smoothScroll() {
    if (!isAnimating) return;

    // Smoothly interpolate between currentY and targetY
    const smoothingFactor = 0.3; // Adjust for speed of transition
    currentY += (targetY - currentY) * smoothingFactor;

    // Update the position
    racerGroup.position.y = currentY;

    // Check if the animation is close enough to the target to stop
    if (Math.abs(targetY - currentY) < 0.01) {
      isAnimating = false; // Stop the animation
      racerGroup.position.y = targetY; // Snap to the target position
      return;
    }

    // Continue the animation
    requestAnimationFrame(smoothScroll);
  }

  // Handle the wheel event
  window.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();

      // Calculate the new targetY based on scroll delta
      const scrollSensitivity = 0.007; // Adjust for scroll sensitivity
      const deltaY = event.deltaY * scrollSensitivity;
      targetY = Math.max(minY, Math.min(maxY, targetY + deltaY));

      // Start the animation loop if not already running
      if (!isAnimating) {
        isAnimating = true;
        smoothScroll();
      }
    },
    { passive: false }
  );

  //***HANDLE MOUSE DRAG ROTATION ***
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };

  window.addEventListener("mousedown", (event) => {
    isDragging = true;
    previousMousePosition = {
      x: event.clientX,
      y: event.clientY,
    };
  });

  window.addEventListener("mousemove", (event) => {
    if (isDragging) {
      const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y,
      };

      const rotationSpeed = 0.005;
      const deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(0, deltaMove.x * rotationSpeed, 0, "XYZ")
      );

      racerGroup.quaternion.multiplyQuaternions(
        deltaRotationQuaternion,
        racerGroup.quaternion
      );
      tableHeader.quaternion.multiplyQuaternions(
        deltaRotationQuaternion,
        tableHeader.quaternion
      );

      previousMousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
    }
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
  });

  window.addEventListener("mouseleave", () => {
    isDragging = false;
  });

  const sceneMesh = new THREE.Group(racerGroup, tableHeader);
  window.addEventListener(
    "resize",
    sceneResize(renderer, camera, scene, sceneMesh)
  );

  window.addEventListener("settingsUpdated", () => {
    const branding = getBrandingSettings();
    racerGroup.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set(branding.racerColor)
      }
    })
  })

  const light = new THREE.AmbientLight(0xffffff, 0.1);
  scene.add(light);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight.position.set(10, 10, 10);
  scene.add(directionalLight);

  // Point light
  const pointLight = new THREE.PointLight(0xffffff, 0.5);
  pointLight.position.set(-100, 10, 10);
  //scene.add(pointLight);

  let lastUpdate = 0;

  function throttledUpdateRacers(location, racerGroup) {
    const now = performance.now();
    if (now - lastUpdate < 500) return; // Only update every 500ms
    lastUpdate = now;
    updateRacers(location, racerGroup);
  }

  function animate(time) {
    requestAnimationFrame(animate);
    throttledUpdateRacers(location, racerGroup);
    updateRacerVisibility(racerGroup, minY, maxVisibleRacers, racerHeight);
    renderer.render(scene, camera);
  }

  animate();
}