import * as THREE from 'three';
import { createTextMesh } from '../utils/createTextMesh';
import { defaultBranding } from '../branding/defaultBranding';

export function createTableHeaderMesh(
  mesh_type,
  headers,
  headerHeight,
  branding = defaultBranding
) {
  const headerGroup = new THREE.Group();
  headerGroup.name = 'headerGroup';
  const spacing = 0; // Spacing between headers
  console.log(branding)

  headers.forEach((header, index) => {
    // Create text mesh for the header
    const mesh_name = mesh_type + `_${header}`
    const textMesh = createTextMesh(mesh_name, header);

    // Create box geometry for the background
    const boxWidth = textMesh.geometry.parameters.width + spacing;
    const boxHeight = 0.8; // Adjust box height as needed
    const boxDepth = 0.25; // Adjust box depth as needed
    const boxGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const boxMaterial = new THREE.MeshStandardMaterial({
      color: branding.backgroundColor || 0x333333,
      roughness: 0.8,
      metalness: 0.7,
    });
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.name = mesh_name + '_MESH';
    // Position the text in the center of the box
    textMesh.position.set(0, 0, boxDepth / 2 + 0.01); // Slight offset to prevent z-fighting

    // Create a group for the box and text
    const cellGroup = new THREE.Group();
    cellGroup.name = mesh_name + '_GROUP';
    cellGroup.add(boxMesh);
    cellGroup.add(textMesh);

    // Position each cell group based on its index and spacing
    cellGroup.position.set(
      (index - headers.length/2 +0.5 )* (boxWidth + spacing), // X position
      0, // Y position
      0 // Z position
    );

    headerGroup.add(cellGroup);
  });

  const boundingBox = new THREE.Box3().setFromObject(headerGroup);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  boundingBox.getSize(size);
  boundingBox.getCenter(center);

  const borderGeometry = new THREE.BoxGeometry(size.x, size.y-0.2, size.z);
  const edgesGeometry = new THREE.EdgesGeometry(borderGeometry);
  const borderMaterial = new THREE.LineBasicMaterial({
    color: branding.borderColor || 0x000000,
  });

  const borderMesh = new THREE.LineSegments(edgesGeometry, borderMaterial);
  borderMesh.position.copy(center); // Align the border to the header group
  headerGroup.add(borderMesh);

  // Center the header group
  const totalWidth = headers.length * (spacing + 1);
  headerGroup.position.x -= totalWidth / 2;

  // Optional: Set the Y position
  headerGroup.position.y = headerHeight;

  return headerGroup;
}
