import './style.css'
import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

// you need a scene, object, and renderer
const scene = new THREE.Scene(); // container that holds objects cameras and lights

// camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// args: FOV, aspect ratio, view frustrum

// renders out graphics to the scene
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'), // needs to know which DOM elem to use.
})

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render( scene, camera );

// three steps to creating an object:
// 1. geometry: {x,y,z} points that makeup a shape
// 2. material: wrapping paper for an object/geometry
// 3. mesh: geometry + material, the thing ur adding to the scene
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
// const material = new THREE.MeshBasicMaterial( { color: 0xFF6347, wireframe: true }); // basic material requires no light source
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
// standard material reacts to light
const torus = new THREE.Mesh( geometry, material );

scene.add(torus); // pretty self explanatory

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50); // 2 dimensional grid along the scene
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));// neg to pos 100

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Avatar - texture mapping
const catTexture = new THREE.TextureLoader().load('cat.jpg')

const cat = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE. MeshBasicMaterial( { map: catTexture } )
)

scene.add(cat);

// Moon
const moonTexture = new THREE.TextureLoader().load('moon.jpeg');
const normalTexture = new THREE.TextureLoader().load('normal.jpeg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: moonTexture,
    normalMap: normalTexture
  })
);
moon.position.z = 30;
moon.position.setX(-10);

scene.add(moon);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top; // how far your element is from the top of the webpage, always neg
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  cat.rotation.y += 0.01;
  cat.rotation.z += 0.01;

  camera.position.z = t *  -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}
document.body.onscroll = moveCamera;


// renderer.render( scene, camera );
function animate(){ // game loop, auto calls render func
  requestAnimationFrame( animate ); // tells browser u want to perform an animation

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.05;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render( scene, camera );
}

animate();