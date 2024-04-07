import Phaser from 'phaser';
import { Player } from './../entities/Player';

export class StrategyMapScene extends Phaser.Scene {
    private player: Player

    constructor() {
      super('StrategyMapScene');
    }

    preload() {
        this.load.image("tiles", "assets/tiles/punyworld-overworld-tileset.png");
        this.load.tilemapTiledJSON("map", "maps/TestTilemap2.json");
        this.load.image('cat', 'assets/tiles/grass.png');
        this.load.spritesheet('runSprite', 'assets/sprites/7 walk.png', { frameWidth: 16, frameHeight: 16 });
        this.load.audio('bananljud', 'assets/audio/bananljud.mp3');  
    }

    create() {
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("Tileset", "tiles");
        const floor = map.createLayer('Floor', tileset, 0, 0);
        const collision = map.createLayer('Collision', tileset, 0, 0);
        collision.setCollisionByExclusion(-1, true);
        this.player = new Player(this, 100, 200);
        this.physics.add.collider(this.player, collision);
    }

    update(): void {
        this.player.update();
    }
}
