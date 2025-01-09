import * as THREE from 'three';

// Doesn't keep ascept ratio of meshes
export function sceneResize(renderer, currentCamera, scene, meshGroup) {
  if (currentCamera) {
    currentCamera.aspect = window.innerWidth / window.innerHeight;
    currentCamera.updateProjectionMatrix();
  }
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    if (meshGroup) {
        const boundingBox = new THREE.Box3().setFromObject(meshGroup);
        const center = boundingBox.getCenter(new THREE.Vector3());

        meshGroup.position.x -= center.x;
        meshGroup.position.y -= center.y;
    }

    renderer.render(scene, currentCamera);
}
