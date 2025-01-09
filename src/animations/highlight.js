import * as THREE from "three";


export function highlightRacer(racerMesh, duration = 2000, color='0xffffff', width = 0.1) {
  
  // Calculate the bounding box of the racerMesh
  const boundingBox = new THREE.Box3().setFromObject(racerMesh);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  boundingBox.getSize(size);
  boundingBox.getCenter(center);

  // Create the box geometry slightly larger than the racerMesh
  const highlightGeometry = new THREE.BoxGeometry(
    size.x + width,
    size.y -0.2 + width,
    size.z + width
  );

  // Create a material for the highlight box
  const highlightMaterial = new THREE.LineBasicMaterial({ color });

  // Create edges for the box geometry
  const edgesGeometry = new THREE.EdgesGeometry(highlightGeometry);
  const highlightBox = new THREE.LineSegments(edgesGeometry, highlightMaterial);

  // Position the highlight box at the center of the racerMesh
  highlightBox.position.copy(center);

  // Add the highlight box to the racerMesh parent
  racerMesh.add(highlightBox);

  // Remove the highlight box after the specified duration
  setTimeout(() => {
    if (highlightBox.parent) {
      racerMesh.remove(highlightBox);

      // Dispose of the geometry and material to free resources
      highlightBox.geometry.dispose();
      highlightBox.material.dispose();
    }
  }, duration);
}
