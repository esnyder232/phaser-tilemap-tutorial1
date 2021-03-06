import SimpleScene from "./simple-scene.js"
import GlobalFuncs from "../global-funcs.js"
import MainScene from "./main-scene.js"

export default class GameManagerScene extends Phaser.Scene {
	constructor() {
		super();
		this.myMessages = [];
		this.globalfuncs = new GlobalFuncs();
	}
	  
	create() {
		//create other scenes
		console.log('adding scenes...');

		//testing arcade physics
		this.scene.add('main-scene', MainScene);
		this.scene.start('main-scene');


		//some things to press and log stuff when i need to
		window.addEventListener("keyup", (e) => {
			console.log('keycode:' + e.keyCode);
			switch(e.keyCode) {				
				case 49: //1
					console.log('1 clicked.');

					break;
				case 50: //2
					console.log('2 clicked.');
					
					break;
				case 51: //3
					console.log('3 clicked.');

					break;
				case 52: //4
					console.log('4 clicked.');
					
					break;
				case 81: //q
					console.log('q clicked.');
					console.log(this);
					break;
			}
		})
	}
	  
	update(timeElapsed, dt) {
	}


}

