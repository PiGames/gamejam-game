import { NINJA_HIT_AREA_WIDTH, LEFT, RIGHT, CENTER, VELOCITY } from '../constants/NinjaConstants';

export default class Ninja extends Phaser.Sprite{
  constructor( game, x, y, key ){
    super( game, x, y, key );

    this.game.physics.enable( this, Phaser.Physics.ARCADE );
    this.game.world.add(this);

    this.body.bounce.y = 0.2;
    this.body.gravity.y = 300;

    this.mouse = this.game.input.activePointer;

    this.anchor.set( 0.5, 1 );
    this.scale.set( 0.5 );

    this.onDeath = new Phaser.Signal();

    this.originY = this.position.y;

    this.jump();
  }
  update(){
    this.body.velocity.x = this.getDirection() * VELOCITY;

    if( this.position.y > this.originY && this.body.velocity.y >= 0 ){
      console.log('stahp!');
      this.body.allowGravity = false;
      this.position.y = this.originY;
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
    if( Phaser.Rectangle.intersects( obstacle.getBounds(), this.getBounds() ) ){
      this.handleDeath();
    }
  }
  handleDeath(){
    this.onDeath.dispatch();
  }
  jump(){
    this.body.velocity.y = -300;
  }
}
