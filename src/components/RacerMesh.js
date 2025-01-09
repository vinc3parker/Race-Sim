import * as THREE from 'three';
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { EdgesGeometry } from "three";

import { createTextMesh } from '../utils/createTextMesh';
import { defaultBranding } from '../branding/defaultBranding';
import { formatName } from '../utils/formatName'

export async function createRacerMesh(
  racers,
  fields,
  nameFormat,
  border = false,
  tablePositionY,
  headerGap,
  branding = defaultBranding // Accept branding as an argument
) {
  const meshGap = 0.05;
  let racerHeight = 0.5;
  let racerWidth = 1.9;
  let totalRacers = 0;
  const totalWidth = racerWidth * fields.length;
  const racerGroup = new THREE.Group();
  racerGroup.name = 'racerGroup';

  racers.forEach((racerData, index) => {
    const racerMesh = new THREE.Group();

    racerMesh.name = `racer_${racerData.id}`;

    fields.forEach((field, index) => {
      const sectionWidth = racerWidth;
      const geometry = new THREE.BoxGeometry(
        sectionWidth,
        racerHeight - meshGap,
        0.1
      );
      const material = new THREE.MeshStandardMaterial({
        color: branding.racerColor, // Use branding color
        roughness: 0.9,
        metalness: 0.2,
      });
      const sectionMesh = new THREE.Mesh(geometry, material);
      sectionMesh.name = `${racerMesh.name}_${field}`;

      // Determine the content for the text sprite
      const content = racerData[field]

      const textSprite = createTextMesh(sectionMesh.name, content, {
        fontface: defaultBranding.fontFace,
        fontSize: defaultBranding.fontSize,
        color: defaultBranding.textColor,
      });

      textSprite.position.set(0, 0, 0.08);
      sectionMesh.add(textSprite);
      

      sectionMesh.position.set(
        index * sectionWidth - totalWidth / 2 + sectionWidth / 2,
        0,
        0
      );
      racerMesh.add(sectionMesh);
    });

    if (border) {
      const boundingBox = new THREE.Box3().setFromObject(racerMesh);
      const boxSize = new THREE.Vector3();
      boundingBox.getSize(boxSize);

      const borderGeometry = new THREE.BoxGeometry(
        boxSize.x,
        boxSize.y,
        boxSize.z
      );
      const edgesGeometry = new EdgesGeometry(borderGeometry);
      const lineGeometry = new LineGeometry();
      const positions = [];

      edgesGeometry.attributes.position.array.forEach((v) => positions.push(v));
      lineGeometry.setPositions(positions);

      const lineMaterial = new LineMaterial({
        color: 0x000000, // Set your desired color
        linewidth: 0.5, // Adjust the thickness here (linewidth is in world units)
      });

      lineMaterial.resolution.set(window.innerWidth, window.innerHeight);

      const thickEdges = new LineSegments2(lineGeometry, lineMaterial);
      thickEdges.computeLineDistances();
      thickEdges.position.copy(boundingBox.getCenter(new THREE.Vector3()));

      racerMesh.add(thickEdges);
    }

    racerMesh.position.set(0, -index * racerHeight, 0);
    racerGroup.add(racerMesh);

    totalRacers += 1;
  });

  racerGroup.position.y += tablePositionY - headerGap;
  return [racerGroup, totalRacers, racerHeight];
}
