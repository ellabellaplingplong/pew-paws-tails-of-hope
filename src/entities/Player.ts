import { Entity } from "./Entity";
import { Projectile } from "./Projectile";
export class Player extends Entity {
  private keyW: Phaser.Input.Keyboard.Key;
  private keyA: Phaser.Input.Keyboard.Key;
  private keyS: Phaser.Input.Keyboard.Key;
  private keyD: Phaser.Input.Keyboard.Key;
  private keyShift: Phaser.Input.Keyboard.Key; // running
  private keyUp: Phaser.Input.Keyboard.Key;
  private keyDown: Phaser.Input.Keyboard.Key;
  private keyLeft: Phaser.Input.Keyboard.Key;
  private keyRight: Phaser.Input.Keyboard.Key;
  private launchTimer: integer;
  private projectiles: Array<Projectile>;


  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'cat');
    this.projectiles = [];
    this.keyW = this.scene.input.keyboard.addKey('W');
    this.keyA = this.scene.input.keyboard.addKey('A');
    this.keyS = this.scene.input.keyboard.addKey('S');
    this.keyD = this.scene.input.keyboard.addKey('D');
    this.keyShift = this.scene.input.keyboard.addKey('Shift');
    this.keyUp = this.scene.input.keyboard.addKey('Up');
    this.keyDown = this.scene.input.keyboard.addKey('Down');
    this.keyLeft = this.scene.input.keyboard.addKey('Left');
    this.keyRight = this.scene.input.keyboard.addKey('Right');


    this.getBody().setSize(28, 32);
    this.getBody().setOffset(8, 0);
    this.initAnimation();
    this.launchTimer = 0;
  }
  private initAnimation(): void {
    this.scene.anims.create({
      key: 'EnzoDownRun',
      frames: this.scene.anims.generateFrameNumbers('runSprite', { start: 0, end: 3 }), // Assuming 4 frames for the idle animation
      frameRate: 5,
      repeat: -1 // Loop forever
    });
    this.scene.anims.create({
      key: 'EnzoUpRun',
      frames: this.scene.anims.generateFrameNumbers('runSprite', { start: 4, end: 7 }), // Assuming 4 frames for the idle animation
      frameRate: 5,
      repeat: -1 // Loop forever
    });
    this.scene.anims.create({
      key: 'EnzoRightRun',
      frames: this.scene.anims.generateFrameNumbers('runSprite', { start: 8, end: 11 }), // Assuming 4 frames for the idle animation
      frameRate: 5,
      repeat: -1 // Loop forever
    });
    this.scene.anims.create({
      key: 'EnzoLeftRun',
      frames: this.scene.anims.generateFrameNumbers('runSprite', { start: 12, end: 15 }), // Assuming 4 frames for the idle animation
      frameRate: 5,
      repeat: -1 // Loop forever
    });
  }

  update(): void {
    let speed: number = 110;
    for (let i = 0; i < this.projectiles.length; i++) {
      this.projectiles[i].update();
    }
    if (this.launchTimer > 0) {
      this.launchTimer--;
    }
    if (this.keyShift?.isDown) {
      speed = 160;
    
    }
    this.getBody().setVelocity(0);

    if (this.keyW?.isDown) {
      this.body.velocity.y = -speed;
      this.anims.play('EnzoUpRun', true)
    }
    if (this.keyA?.isDown) {
      this.body.velocity.x = -speed;
      this.anims.play('EnzoLeftRun', true)
    }
    if (this.keyS?.isDown) {
      this.body.velocity.y = speed;
      this.anims.play('EnzoDownRun', true)
    }
    if (this.keyD?.isDown) {
      this.body.velocity.x = speed;
      this.anims.play('EnzoRightRun', true)
    }
    if (this.keyUp?.isDown && this.launchTimer == 0) {
      this.scene.sound.play('bananljud');
      this.launchTimer = 30;
      this.projectiles.push(new Projectile(this.scene, this.x, this.y, 0+this.body.velocity.x,-1000+this.body.velocity.y))
      console.log()
    }

    if (this.keyDown?.isDown && this.launchTimer == 0){
      this.scene.sound.play('bananljud');
      this.launchTimer = 30;
      this.projectiles.push(new Projectile(this.scene, this.x, this.y,0+this.body.velocity.x,1000+this.body.velocity.y))
      console.log()
    }

    if (this.keyRight?.isDown && this.launchTimer == 0) {
      this.scene.sound.play('bananljud');
      this.launchTimer = 30;
      this.projectiles.push(new Projectile(this.scene, this.x, this.y, 1000+this.body.velocity.x, 0+this.body.velocity.y))
      console.log()
    }

    if (this.keyLeft?.isDown && this.launchTimer == 0) {
      this.scene.sound.play('bananljud');
      this.launchTimer = 30;
      this.projectiles.push(new Projectile(this.scene, this.x, this.y, -1000+this.body.velocity.x, 0+this.body.velocity.y))
      console.log()
    }


  
  }

}
