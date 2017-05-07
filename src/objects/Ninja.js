import { NINJA_HIT_AREA_WIDTH, LEFT, RIGHT, CENTER, VELOCITY } from '../constants/NinjaConstants';
import { getRailNumberBasedOnPosition } from '../utils/RoadUtils';

export default class Ninja extends Phaser.Sprite{
  constructor( game, x, y, key ){
    super( game, x, y, key, 1 );

    this.game.physics.enable( this, Phaser.Physics.ARCADE );
    this.game.world.add( this );

    this.body.gravity.y = 400;
    this.body.allowGravity = false;

    this.mouse = this.game.input.activePointer;

    this.anchor.set( 0.5, 1 );
    this.scale.set( 0.5 );

    this.onDeath = new Phaser.Signal();

    this.originY = this.position.y;
  }
  update(){
    const currentDirection = this.getDirection();
    this.body.velocity.x = currentDirection * VELOCITY;
    this.frame = currentDirection + 1;

    if( this.body.allowGravity === true && this.position.y > this.originY && this.body.velocity.y >= 0 ){
      this.body.allowGravity = false;
      this.position.y = this.originY;
      this.body.velocity.y = 0;
    }
    if ( this.game.input.activePointer.isDown ){
       this.jump();
     }
  }
  getDirection(){
    if( this.mouse.x + this.game.camera.x < this.position.x - NINJA_HIT_AREA_WIDTH / 2 ){
      return LEFT;
    } else if( this.mouse.x + this.game.camera.x > this.position.x + NINJA_HIT_AREA_WIDTH / 2 ){
      return RIGHT;
    } else {
      return CENTER;
    }
  }
  checkForCollision( obstacle ){
    const obstacleRail = getRailNumberBasedOnPosition( obstacle.x );
    const ninjaRail = getRailNumberBasedOnPosition( this.x );
    if( obstacleRail === ninjaRail && this.body.allowGravity === false ){
      this.handleDeath();
    }
  }
  handleDeath(){
    this.onDeath.dispatch();
  }
  jump(){
    if( this.body.allowGravity === false ){
    this.body.velocity.y = -300;
    this.body.allowGravity = true;
    }
  }
}
