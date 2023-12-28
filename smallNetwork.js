// Set up scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('background').appendChild(renderer.domElement);

// Create a reactive network of nodes and connections
var nodes = [];
var connections = [];
var maxConnections = 3; // Maximum number of connections per node

for (let i = 0; i < 15; i++) {
    var geometry = new THREE.SphereGeometry(0.2, 32, 32);
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.2 });
    var node = new THREE.Mesh(geometry, material);

    // Adjusted range for random positions to bring nodes closer together
    node.position.x = (Math.random() - 0.5) * 5;
    node.position.y = ((Math.random() - 0.5) * 5) - 1;
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

camera.position.z = 10;
camera.position.x = -5;
camera.position.y = -2;

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
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

// Call the animation function
animate();
