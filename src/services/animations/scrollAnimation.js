import TWEEN from "@tweenjs/tween.js";

export function handleScroll(racerGroup, options = {}) {
  const {
    sensitivity = 0.01,
    minY = -(racerGroup.children.length - 1) * 1.2,
    maxY = 0,
    duration = 500,
    easingFunction = TWEEN.Easing.Quadratic.Out,
  } = options;

  // Calculate scroll delta
  const currentScrollTop =
    window.scrollY ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;
  const newYPosition = racerGroup.position.y - currentScrollTop * sensitivity;

  // Clamp the position within the min and max bounds
  const clampedPosition = Math.max(minY, Math.min(maxY, newYPosition));

  // Use TWEEN to animate the change in position
  new TWEEN.Tween(racerGroup.position)
    .to({ y: clampedPosition }, duration)
    .easing(easingFunction)
    .start();
}
