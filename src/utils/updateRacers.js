import { defaultBranding } from "../branding/defaultBranding";
import { getRace } from "../data/leaderboardData";
import { createTextMesh } from "./createTextMesh";
import { highlightRacer } from "../animations/highlight";

export async function updateRacers(location, racerGroup) {

  // Fetch updated race data
  let updatedRacers;
  try {
    updatedRacers = await getRace(location);
  } catch (error) {
    console.error("Error fetching race data:", error);
    return;
    }

    const racerHeight = 0.5;

  // Traverse each racer in the group
  racerGroup.children.forEach((racerMesh) => {
    const racerId = racerMesh.name; // Assumes racerMesh.name is `racer_<id>`
    const racerIdNumber = parseInt(racerId.split("_")[1]);

    // Find the corresponding updated racer data
    const updatedRacer = updatedRacers.find((r) => r.id === racerIdNumber);
    if (!updatedRacer) {
      return; // Skip this racer if no matching data
    }

    // Animate position change if rank has updated
    const newY = -(updatedRacer.rank - 1) * racerHeight;
    if (racerMesh.position.y !== newY) {
      const startY = racerMesh.position.y;
      const duration = 500; // Animation duration in milliseconds
      const startTime = performance.now();

      function animatePosition(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1); // Normalize to [0, 1]

        racerMesh.position.y = startY + (newY - startY) * progress;

        if (progress < 1) {
          requestAnimationFrame(animatePosition);
        } else {
          racerMesh.position.y = newY; // Ensure final position is exact
        }
      }

      requestAnimationFrame(animatePosition);
    }

    // Iterate over the fields (rank, fastestLap, gap)
    ["rank", "fastestLap", "gap"].forEach((field) => {
      // Find the mesh for the field (e.g., racer_1_rank)
      const fieldMesh = racerMesh.getObjectByName(`${racerId}_${field}`);
      if (!fieldMesh) {
        return; // Skip if the field mesh is not found
      }

      // Find the text mesh for the field (e.g., racer_1_rank_TEXT)
      const textMesh = fieldMesh.getObjectByName(`${racerId}_${field}_TEXT`);
      if (!textMesh) {
        console.warn(`Text mesh not found: ${racerId}_${field}_TEXT`);
        return; // Skip if the text mesh is not found
      }

      // Check if the text needs updating
      const newValue = `${updatedRacer[field]}`;
      if (textMesh.material.map.image.textContent !== newValue) {
        if (field = 'fastestLap') {
          //highlightRacer(racerMesh)
        }
        // Dispose of the old texture and material
        if (textMesh.material.map) {
          textMesh.material.map.dispose();
        }
        if (textMesh.material) {
          textMesh.material.dispose();
        }

        // Recreate the texture for the new text
        const updatedTextMesh = createTextMesh(
          `${racerId}_${field}`,
          newValue,
          {
            fontface: defaultBranding.fontFace,
            fontSize: defaultBranding.fontSize,
            color: defaultBranding.textColor,
          }
        );
        textMesh.material.map = updatedTextMesh.material.map;
        textMesh.material.map.needsUpdate = true;
      } else {
        console.log(`No update needed for ${textMesh.name}`);
      }
    });
  });
}
