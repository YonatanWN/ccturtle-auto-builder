import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight,0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const grid = new THREE.Group();
const lines = new THREE.Group();



controls.mouseButtons = {
	MIDDLE: THREE.MOUSE.PAN,
	RIGHT: THREE.MOUSE.ROTATE
}

controls.maxPolarAngle = Math.PI/2;

renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

function createBase(x,y){
	for(let i = 0; i < y; i++){
		for(let j = 0; j < x; j++){
			let planeGeometry = new THREE.PlaneGeometry( 1, 1, 32 );

			let planeMaterial = new THREE.MeshBasicMaterial( {color: 0x5e9d34, side: THREE.DoubleSide} );
			let plane = new THREE.Mesh( planeGeometry, planeMaterial );
			plane.position.set(j-Math.floor(x/2), 0, i-Math.floor(y/2));
			let edges = new THREE.EdgesGeometry(planeGeometry);
			let line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2, morphTargets: true } ) );
			line.position.set(j-Math.floor(x/2), 0, i-Math.floor(y/2));






			plane.rotation.x = Math.PI/2;
			line.rotation.x = Math.PI/2;

			lines.add(line);
			grid.add(plane);

		}

	}
	scene.add(grid);
	scene.add(lines);
}


createBase(15,15);
camera.position.z =10;
camera.position.y = 10;





animate();



function resetBlocks(){
	for(let i = 0; i < scene.children.length; i++){
			if(scene.children[i].material){
				scene.children[i].material.opacity = 1;
			}
	}
 }

function hoverBlocks(){
	raycaster.setFromCamera(mouse, camera );
	const intersects = raycaster.intersectObjects(scene.children);
	for ( let i = 0; i < intersects.length; i ++ ) {
		intersects[i].object.material.transparent = true;
		intersects[i].object.material.opacity = 0.5;
	}
}

function animate(){
  controls.update();
	resetBlocks();
  hoverBlocks();
	renderer.render(scene, camera);
  requestAnimationFrame(animate);

}

function onMouseMove( event ) { // calculate mouse position in normalized device coordinates  (-1 to +1) for both components
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;


}
function onMouseDrag(event){

}

function onMouseClick(event){
	event.preventDefault();
	raycaster.setFromCamera(mouse,camera);
	let intersectsgrid = raycaster.intersectObjects(grid.children) ;
	let intersectblocks = raycaster.intersectObjects(scene.children);

	mouse.x = event.clientX / window.innerWidth * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	if(intersectsgrid.length > 0 && intersectblocks.length == 0){
				let geometryf = new THREE.BoxGeometry();
				let materialf = new THREE.MeshBasicMaterial( { color: 0xFFC0CC } );
				let f = new THREE.Mesh( geometryf, materialf );
				f.position.setX(intersectsgrid[0].object.position.x);
				f.position.setZ(intersectsgrid[0].object.position.z);
				f.position.setY(intersectsgrid[0].object.position.y + .5);

				let edges = new THREE.EdgesGeometry(geometryf);
				let line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2, morphTargets: true } ) );

				line.position.set(intersectsgrid[0].object.position.x, intersectsgrid[0].object.position.y + .5,intersectsgrid[0].object.position.z);

				lines.add(line);
				scene.add(f);
	}else if (intersectblocks.length > 0) {


				let geometryf = new THREE.BoxGeometry();
				let materialf = new THREE.MeshBasicMaterial( { color: 0xFFC0CC } );
				let f = new THREE.Mesh( geometryf, materialf );


				f.position.setX(intersectblocks[0].object.position.x + intersectblocks[0].face.normal.x);
				f.position.setY(intersectblocks[0].object.position.y + intersectblocks[0].face.normal.y);
				f.position.setZ(intersectblocks[0].object.position.z +  intersectblocks[0].face.normal.z);

				let edges = new THREE.EdgesGeometry(geometryf);
				let line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2, morphTargets: true } ) );
				line.position.set(intersectblocks[0].object.position.x + intersectblocks[0].face.normal.x,intersectblocks[0].object.position.y + intersectblocks[0].face.normal.y, intersectblocks[0].object.position.z +  intersectblocks[0].face.normal.z);



				lines.add(line);
				scene.add(f);


		}


}
function onWindowResize(){
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
}

window.addEventListener('resize', onWindowResize, false);
window.addEventListener( 'mousemove', onMouseMove, false );
window.addEventListener('click', onMouseClick, false);
window.addEventListener('dragstart', onMouseDrag, false);
