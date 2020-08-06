export default class MainScene extends Phaser.Scene {
	constructor(config) {
		super(config);
	}

	init() {
		console.log('init on ' + this.scene.key + ' start');

		this.player = {};
	}

	preload() {
		console.log('preload on ' + this.scene.key + ' start');
		
		//loading from an array
		//this.load.image("mario-tiles", "assets/tilesets/super-mario-tiles.png");


		// //loading from a csv file
		// this.load.image("tiles", "assets/tilesets/catastrophi_tiles_16_blue.png");
		// this.load.tilemapCSV("map", "assets/tilesets/catastrophi_level3.csv");

		//loading from tiled
		this.load.image("my-tiles", "assets/tilesets/tuxmon-sample-32px-extruded.png");
		this.load.tilemapTiledJSON("my-map", "assets/tilemaps/tuxemon-town.json");
	}
	  
	create() {
		console.log('create on ' + this.scene.key + ' start');

		//loading from an array
		// var level = [
		// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 1, 2, 3, 0, 0, 0, 1, 2, 3, 0],
		// 	[0, 5, 6, 7, 0, 0, 0, 5, 6, 7, 0],
		// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 0, 0, 14, 13, 14, 0, 0, 0, 0, 0],
		// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 0, 14, 14, 14, 14, 14, 0, 0, 0, 15],
		// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15],
		// 	[35, 36, 37, 0, 0, 0, 0, 0, 15, 15, 15],
		// 	[39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39]
		// ];

		// var map = this.make.tilemap({data: level, tileWidth: 16, tileHeight: 16});
		// var tiles = map.addTilesetImage("mario-tiles");
		// var layer = map.createStaticLayer(0, tiles, 0, 0);


		// //loading form a csv file
		// var map = this.make.tilemap({key: "map", tileWidth: 16, tileHeight: 16});
		// var tileset = map.addTilesetImage("tiles");
		// var layer = map.createStaticLayer(0, tileset, 0, 0); //layer index, tileset, x, y


		//loading from tiled
		var map = this.make.tilemap({key: "my-map"});

		var tuxmonTileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "my-tiles", 32, 32);
		var belowLayer = map.createStaticLayer("Below Player", tuxmonTileset, 0, 0);
		var worldLayer = map.createStaticLayer("World", tuxmonTileset, 0, 0);
		var aboveLayer = map.createStaticLayer("Above Player", tuxmonTileset, 0, 0);

		//adding collision to layer
		worldLayer.setCollisionByProperty({collides: true});

		//debug collision on tiles
		var debugGraphics = this.add.graphics().setAlpha(0.75);
		worldLayer.renderDebug(debugGraphics, {
			tileColor: null, //color of non-colliding tiles
			collidingTileColor: new Phaser.Display.Color(243, 255, 255, 255), //color of colliding tiles
			faceColor: new Phaser.Display.Color(255, 0, 255, 255) //color of colliding face edges
		})



		//camera controls
		this.cursors = this.input.keyboard.createCursorKeys();
		this.controls = new Phaser.Cameras.Controls.FixedKeyControl({
			camera: this.cameras.main,
			left: this.cursors.left,
			right: this.cursors.right,
			up: this.cursors.up,
			down: this.cursors.down,
			speed: 0.5
		});

		//player
		this.player = this.physics.add.sprite(400, 350, "atlas", "misa-front");

		//collider
		this.physics.add.collider(this.player, worldLayer);

	}
	  
	update(timeElapsed, dt) {
		//update camera
		//this.controls.update(dt);

		//update player
		this.player.body.setVelocity(0);

		//horizontal movement
		if(this.cursors.left.isDown) {
			this.player.body.setVelocityX(-100);
		} else if(this.cursors.right.isDown) {
			this.player.body.setVelocityX(100);
		}

		//vertical movement
		if(this.cursors.up.isDown) {
			this.player.body.setVelocityY(-100);
		} else if(this.cursors.down.isDown)	{
			this.player.body.setVelocityY(100);
		}

		//normalize and scale the velocity so that player cna't move faster along a diagonal
		this.player.body.velocity.normalize().scale(200);


	}
}

