import * as THREE from "three";
import getBrandingSettings from "./getBrandingSettings";

export function createTextMesh(meshName, text, canvasOptions = {}, planeOptions = {}) {
  const branding = getBrandingSettings();
  
  // Create a canvas element
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Set canvas dimensions
  canvas.width = canvasOptions.width || 512;
  canvas.height = canvasOptions.height || 256;

  // Draw text on the canvas
  ctx.fillStyle = canvasOptions.backgroundColor || "transparent"; // Background color
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill background if needed
  ctx.fillStyle = branding.textColor || "white"; // Text color
  ctx.font = `${branding.fontSize}px ${branding.fontFace}` || "48px Arial"; // Font size and style
  ctx.textAlign = "center"; // Center the text
  ctx.textBaseline = "middle"; // Align text to the middle
  ctx.fillText(text, canvas.width / 2, canvas.height / 2); // Render text

  // Create a texture from the canvas
  const texture = new THREE.CanvasTexture(canvas);

  // Create a material using the texture
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
  });

  // Create a plane geometry
  const aspectRatio = canvas.width / canvas.height;
  const planeWidth = planeOptions.width || 2;
  const planeHeight = planeWidth / aspectRatio; // Maintain aspect ratio
  const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);

  // Create the mesh
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = `${meshName}_TEXT`;

  const group = new THREE.Group();
  

  return mesh; // Return the created mesh
}


