class Location {
	constructor(lat, lon, texture) {
		this.lat = lat
		this.lon = lon
		this.texture = texture
	}
}

function newPlanet(modelPath) {
	var mesh;
	var mouseDown = false;
	
	var startX = 0;
	var startY = 0;
	
	var mouseX = 0;
	var mouseY = 0;
	var rotation = 0;
	
	var deltaMX = 0;
	var deltaMY = 0;
	var movedX = 0;
	var movedY = 0;

	// Credit: https://stackoverflow.com/questions/36369734/how-to-map-latitude-and-longitude-to-a-3d-sphere
	function latLongToVector(lat, lon) {
		const radius = 2.03;
		var phi   = (90-lat)*(Math.PI/180),
		theta = (lon+180)*(Math.PI/180),
		x = -((radius) * Math.sin(phi)*Math.cos(theta)),
		z = ((radius) * Math.sin(phi)*Math.sin(theta)),
		y = ((radius) * Math.cos(phi));

		return new THREE.Vector3(x,y,z);
	}
	
	function newLabel(location) {
		const map = new THREE.TextureLoader().load( location.texture );
		const material2 = new THREE.SpriteMaterial( { map: map } );
		const sprite = new THREE.Sprite( material2 );
		var newVector = latLongToVector(location.lat, location.lon);
		sprite.position.x = newVector.x;
		sprite.position.y = newVector.y;
		sprite.position.z = newVector.z;
		mesh.add( sprite );
	}
	
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	
	onmousemove = function(e){mouseX = e.clientX; mouseY = e.clientY}

	const renderer = new THREE.WebGLRenderer( { alpha: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	
	/*
	var texture = new THREE.TextureLoader().load( planetTexture );;
	var geometry = new THREE.SphereGeometry( 0.1 );
	var material = new THREE.MeshBasicMaterial( { map: texture } );
	*/
	
	
	var mat;
	var geo;
	var texture;
	const loader = new THREE.GLTFLoader();
	loader.load( modelPath, function ( gltf ) {
		mesh = gltf.scene;

		scene.add( mesh );
	}, undefined, function ( error ) {
		console.error( error );
	} );
	
	const dirLight = new THREE.AmbientLight( 0xffffff, 1 );
	dirLight.position.set( - 3, 10, - 10 );
	scene.add( dirLight );;
	
	camera.position.z = 20;

	function animate() {
		requestAnimationFrame( animate );
		
		if(mesh != null) {
			if(mouseDown) {
				deltaMX = mouseX - startX;
				deltaMY = mouseY - startY;
			}

			//mesh.rotation.x += 0.01;
			mesh.rotation.y = rotation + (deltaMX + movedX) / 200;
			rotation -= 0.01
			mesh.rotation.x = (deltaMY + movedY) / 200
			
			renderer.render( scene, camera );
		}
	}

	animate();
	let image = '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' + 
'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' + 
'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@~!-;:$@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@-~--;=@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@:---~!@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@*-,--~@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@$,!  !#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@-~::~#=*;~--$@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@*=;~~-------,,,,,,$@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@;,,,,,,,,,,--,,,,,=@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@*,,,,,,,,,,,,,,,,,!@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@=,,,,,,,,,,,,,,,,,:@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@$,,,,,,,,,,,,,,,,,~@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@#,,,,,,,,,,,,,,,,,-@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@,,,,,,,,,,,,,,,,,-@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' + 
'@@@@,,,,,,,,,,,,,,,,,,@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@,,,,,,,,,,,,,,,,,,@@@@@@@@@@@@@@@@@@@@@@#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' + 
'@@@@,,,,,,,,,,,,,,,,,,=@@@@@@@@@@@@@@@@@@@@@@=;$@@@@@@@@@@@@@@@@@@#~@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' + 
'@@@@---,,--,,,,,,,::~-=@@@@@@@@@@@@@@@@@@@@@@!$$@@@@,:@@@@@@@@#@@#-@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@,,,,,,,,,,,,-~-,--#@@@@@@@@@@@@@@@@@@@@@@$~@@@@@.@#=@@@@@@!#;:$@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' + 
'@@@@-~~~:,.,,,,,,--,--@@@@@@@@@@@@@@@@@@@@@@,!:#@@@@!#=,@@@@@#,-#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@------.,,,,,----,-@@@@@@@@@@@@@@@@@@@@@.:@$$@@@*-.=@@@@@@$,$!@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@*----~,-,,,,,-~~;=@@@@@@@@@@@@@*@@@@#!~:@@$$@,~$@;#@@@@@@=.@;@@@@@##*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@#--,,~,,.,,...!@@@@@@@@@@@@@@@@@@@@@@@-$@@=$;*!*!!-:;=@@@*.@:@@@@@#$*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@--~!;,. ...  -@@@@@@@@@@@@@@@@@@@@@@==~#@:.$,;$@@-@@@#*-:~#;@@@@@~!$@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@#@@@*.  .,   ,@@@@@@@@@@@@@@@@@@@@@@#=@-:,#@~:@@@*@@=~ @@#~=@@@@,#:@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' + 
'@@@@@@@@@$    ~   .@@@@@@@@@@@@@@@@@@@@@@$$@@ =@#;~@@#=@:$:@@@@~@#@@,@$=@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@#.   :   .@@@@@@@@@@@@@@@@@@@@@@$$@@ .@@$;=@@=@~#,@@@$,@@@!#@~@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@.   :    #@@@@@@@@@@@@@@@@@@@@@$$@@..@@#~*@@*@:@~@@@:-@@=!@:@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@.   -    =@@@@@@@@@@@@@@@@@@@@@$=@@.,@@@~=@#:@=$$@@!$-@*;@*$@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@,   ..   ;@@@@@@@@@@@@@@@@@@@@@@!@@.=@@@;=@-@@$~@@#!#~,#@*=#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@-    ,   ~@@@@@@@@@@@@@@@@@@@@@@;=                  ~!;@$*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@:    -   ,@@@@@@@@@@@@@@@@@@@@@@;=                  ~$;#:@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@!    : . .@@@@@@@@@@@@@@@@@@@@#@*~ -.- ,,., : -,.!- .@;;#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@$    ;    @@@@@@@@@@@@@@@@@@$:-:~- $.#~@$,@,;;=!=*$ :@~!@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@#    ~    #@@@@@@@@@@@@@@@@#:--- ~ *~$:$= *-;-=*==* :@~@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' + 
'@@@@@@@@@@@    -    =@@@@@@@@@@@@@@@@#-,,- -                  ,::#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@.   ,    ;@@@@@@@@@@@@@@@@=---- -                  ,,-,$@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@,    -   ~@@@@@@@@@@@@@@@@*---- -  .    ... .... .. --,-*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' + 
'@@@@@@@@@@@-    ~   ,@@@@@@@@@@@@@@#@;----,.,,,,...--,..-,,,- ,-----*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@;    :   .@@@@@@@@@@@@@@@@:------ ,.-,,--.,----,. ------,-!@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@!    :   .@@@@@@@@@@@@@@@@~-----,-,,,.--,-----..,----,-----;@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@$    -.,:=#@@@@@@@@@@@@@@@-,--------------------------------:@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@#.,-!#@@@@@@@@@@@@@@@@@@@#-,-------------------------------,-:@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@@#@@@@@@@@@@@@@@@@@@@@@@@@=~:------------------------------,--:@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@@@@@@@@#@@@@@@@@@@@@@@@@@=~-----------------------------------,~@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#~--------,----;@#~----,-------------~=@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#~-------,--;@@@@@=~-,-----------------*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' + 
'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#~-------:#@@@@@@@@;------------------=@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@~----:#@@@@@@@@@@@#:---------------#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@~-:#@@@@@@@@@@@@@@@$~------------$@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#######$$$$$======' +
'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#$$*$$##$$$$$====***!!!:~~~~~~~~~~;:;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;' +
';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:~-------~:;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;' +
';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;~-----:;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;' +
';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:~~:;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;' +
';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;::;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;' +
';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;' +
';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;' +
';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;' +
';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;' +
';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;' +
';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;' +
'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' +
'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@';
        console.log(image);
	
	
	// Mouse detection source: https://stackoverflow.com/questions/322378/javascript-check-if-mouse-button-down
	
	document.body.onmousedown = function() { 
		mouseDown = true;
		startX = mouseX;
		startY = mouseY;
	}
	document.body.onmouseup = function() {
		mouseDown = false;
		movedX += deltaMX;
		movedY += deltaMY;
		deltaMX = 0;
		deltaMY = 0;
	}
}