import { NINJA_HIT_AREA_WIDTH, LEFT, RIGHT, CENTER, VELOCITY } from '../constants/NinjaConstants';

export default class Ninja extends Phaser.Sprite{
  constructor( game, x, y, key ){
    super( game, x, y, key );

    this.game.physics.enable( this, Phaser.Physics.ARCADE );
    this.game.world.add(this);

    this.mouse = this.game.input.activePointer;
  }
  update(){
    this.body.velocity.x = this.getDirection() * VELOCITY;
  }
  getDirection(){
    if( this.mouse.x + this.game.camera.x < this.position.x ){
      return LEFT;
    } else if( this.mouse.x + this.game.camera.x > this.position.x + NINJA_HIT_AREA_WIDTH ){
      return RIGHT;
    } else {
      return CENTER;
    }
  }
}
