export default class Player {
	constructor(scene) {
		this.scene = scene;
	}

	init() {
		console.log('init on player in ' + this.scene.key + ' start');

	}

	preload() {
		console.log('preload on player in ' + this.scene.key + ' start');
		
	}
	  
	create() {
		console.log('create on player in ' + this.scene.key + ' start');

	}
	  
	update(timeElapsed, dt) {

	}
}

