import * as THREE from 'three';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

export function setupRaycaster(camera) {
    return { raycaster, mouse, camera };
}

export function getIntersectedObjects(objects, camera) {
    raycaster.setFromCamera(mouse, camera);
    return raycaster.intersectObjects(objects);
}