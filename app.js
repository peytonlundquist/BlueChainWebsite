
// Set up scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({alpha: true, antialias: false});

// Create a reactive network of nodes and connections
var nodes = [];
var connections = [];
var maxConnections = 3; // Maximum number of connections per node

console.log("mouse over")

for (let i = 0; i < 25; i++) {
    console.log("mouse over")

    var geometry = new THREE.SphereGeometry(0.2, 32, 32);
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.2 });
    var node = new THREE.Mesh(geometry, material);

    // Adjusted range for random positions to bring nodes closer together
    node.position.x = (Math.random() - 0.5) * 5;
    node.position.y = ((Math.random() - 0.5) * 5);
    node.position.z = (Math.random() - 0.5) * 5;

    scene.add(node);
    nodes.push(node);

    // Create connections between nodes (limited to a fixed number of connections)
    for (let j = 0; j < maxConnections; j++) {
        // Randomly select a node to connect to
        const randomNodeIndex = Math.floor(Math.random() * i);
        const targetNode = nodes[randomNodeIndex];

        var lineGeometry = new THREE.BufferGeometry().setFromPoints([node.position, targetNode.position]);
        var lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.1 });
        var connection = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(connection);
        connections.push(connection);
    }
}

camera.position.z = 6;
camera.position.y = 0;
camera.position.x = 0;


// Animation function
function animate() {
    requestAnimationFrame(animate);


    // Rotate the entire scene
    scene.rotation.x += 0.0005;
    scene.rotation.y += 0.0005;

    // Rotate nodes
    nodes.forEach(node => {
        node.rotation.x += 0.01;
        node.rotation.y += 0.01;
    });

    renderer.render(scene, camera);
}

// Resize function
function onWindowResize() {
    // camera.aspect = window.innerWidth / window.innerHeight/2;
    // camera.updateProjectionMatrix();
    //renderer.setSize(window.innerWidth, window.innerHeight/2);
}

window.addEventListener('resize', onWindowResize, false);

// Call the animation function
animate();

container = document.getElementById( 'canvas' );
// document.body.appendChild( container );

// renderer = new THREE.WebGLRenderer({alpha: true, antialias: false});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight/2.5);
container.appendChild( renderer.domElement );
