import * as THREE from 'three';
import { defaultBranding } from '../branding/defaultBranding';

export function createTextSprite(message, options = {}) {
    const {
        fontFace = 'Arial',
        fontSize = 70,
        color = defaultBranding.textColor,
        backgroundColor = {r: 0, g: 0, b: 0, a: 0.0},
    } = options;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = 1024;
    canvas.height = 512;

    context.font = `${fontSize}px ${fontFace}`;
    context.fillStyle = `rgba(${color.r}. ${color.g}, ${color.b}, ${color.a})`;
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.fillText(message, canvas.width / 2, canvas.height / 2);

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillText(message, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    texture.minFilter = THREE.LinearFilter;
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);

    const aspectRatio = canvas.width / canvas.height;
    sprite.scale.set(aspectRatio, 1, 1);

    return sprite;
}