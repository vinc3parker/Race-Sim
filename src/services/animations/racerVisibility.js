export async function updateRacerVisibility(racerGroup, minY, maxVisibleRacers, racerHeight) {
  racerGroup.children.forEach((racerMesh) => {
    const racerY = racerGroup.position.y + racerMesh.position.y;
    if (racerY > minY + racerHeight || racerY < minY -(maxVisibleRacers - 1) * racerHeight) {
      racerMesh.visible = false;
    } else {
      racerMesh.visible = true;
    }
  });
}
