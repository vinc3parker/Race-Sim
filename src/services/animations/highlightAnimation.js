import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js'

export function highlightRacer(racerMesh, duration = 0.5, scaleUp = 1.5, highlighColor = 0xffff00) {
    const originalScale = racerMesh.scale.clone();
    const originalColor = racerMesh.material.color.geHex();

    new TWEEN.Tween(racerMesh.scale)
        .to({ x: scaleUp, y: scaleUp, z: scaleUp }, duration * 1000)
        .easing(TWEEN.Easing.Elastic.Out)
        .start();
    
    racerMesh.material.emissive.setHex(highlighColor);

    setTimeout(() => {
        new TWEEN.Tween(racerMesh.scale)
            .to({ x: originalScale.x, y: originalScale.y, z: originalScale.z }, duration * 1000)
            .easing(TWEEN.Easing.Elastic.Out)
            .start();
        
        racerMesh.material.emissive.setHex(originalColor);
    }, duration * 20000);
}