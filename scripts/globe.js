mapboxgl.accessToken = 'pk.eyJ1Ijoic3RldmllZ3JpZmZpbmRlc2lnbiIsImEiOiJja24waTQzeHYwbndvMnZtbnFrYXV3ZjdjIn0.zhhJzykz0VYq7RQWBJxh7A';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5); // Adjust the position to center the globe
camera.lookAt(scene.position); 
camera.position.x = -3.5;

const renderer = new THREE.WebGLRenderer({ alpha: true }); // Set alpha to true
renderer.setSize(window.innerWidth, window.innerHeight - 300);
renderer.setClearColor(0x000000, 0); // Set clear alpha to false
document.getElementById('container').appendChild(renderer.domElement);

const sphereGeometry = new THREE.SphereGeometry(1.7, 32, 32);
const textureLoader = new THREE.TextureLoader();
const earthTexturePath = './images/images globe/earth-texture.jpeg'; 
const cityLightsTexturePath = './images/images globe/8k_earth_nightmap.jpg'; 

const initialRotationX = Math.PI / 8; // Adjust the initial rotation here
const initialRotationY = Math.PI / 2; // Adjust the initial rotation here

let earth;

function loadTextures() {
    const earthTexture = textureLoader.load(earthTexturePath);
    const cityLightsTexture = textureLoader.load(cityLightsTexturePath);

    const vertexShader = `
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    const fragmentShader = `
        uniform sampler2D earthTexture;
        uniform sampler2D cityLightsTexture;
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
            vec4 earthColor = texture2D(earthTexture, vUv);
            vec4 cityLightsColor = texture2D(cityLightsTexture, vUv);
            // Simulate a light direction for day/night
            vec3 lightDirection = normalize(vec3(1.0, 0.0, 1.0));
            float lightIntensity = dot(vNormal, lightDirection) * 0.5 + 0.5;
            // Adjust the intensity of city lights
            float cityLightsIntensity = 1.0 - smoothstep(0.4, 0.99, lightIntensity);
            vec4 blendedColor = mix(earthColor, cityLightsColor, cityLightsIntensity);
            gl_FragColor = blendedColor;
        }
    `;

    const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
            earthTexture: { value: earthTexture },
            cityLightsTexture: { value: cityLightsTexture }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });

    earth = new THREE.Mesh(sphereGeometry, shaderMaterial);
    earth.rotation.x = initialRotationX; // Set the initial rotation
    earth.rotation.y = initialRotationY; // Set the initial rotation
    scene.add(earth);
    
    // Load and add the marker
    addMarker();
}

function addMarker() {
    const markerTexture = textureLoader.load('./images/images globe/finnish-flag.png'); // Path to your marker image
    const markerMaterial = new THREE.SpriteMaterial({ map: markerTexture });
    const marker = new THREE.Sprite(markerMaterial);

    // Position the marker at Finland's approximate coordinates
    const lat = 64.0; // Latitude for Finland
    const lon = 26.0; // Longitude for Finland

    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const radius = 1.7;
    marker.position.x = radius * Math.sin(phi) * Math.cos(theta);
    marker.position.y = radius * Math.cos(phi);
    marker.position.z = radius * Math.sin(phi) * Math.sin(theta);
    marker.scale.set(0.1, 0.1, 1.0); // Adjust the size of the marker

    scene.add(marker);
}

function animate() {
    requestAnimationFrame(animate);
    if (earth) {
        earth.rotation.y += 0.003; // You can keep this if you want continuous rotation
    }
    renderer.render(scene, camera);
}

loadTextures();
animate();

let mouseDown = false,
    mouseX = 0,
    mouseY = 0;

function onMouseMove(event) {
    if (!mouseDown) return;
    const deltaX = event.clientX - mouseX;
    const deltaY = event.clientY - mouseY;
    mouseX = event.clientX;
    mouseY = event.clientY;
    if (earth) {
        earth.rotation.y += deltaX * 0.01;
        earth.rotation.x += deltaY * 0.01;
    }
}

function onMouseDown(event) {
    mouseDown = true;
    mouseX = event.clientX;
    mouseY = event.clientY;
}

function onMouseUp() {
    mouseDown = false;
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('mousemove', onMouseMove);
window.addEventListener('mousedown', onMouseDown);
window.addEventListener('mouseup', onMouseUp);
