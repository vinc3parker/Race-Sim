export function handleMouseMove(event, mouse) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

export function setupMouseEvents(mouse) {
    window.addEventListener('mousemove', (event) => handleMouseMove(event, mouse));
}