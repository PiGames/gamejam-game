import { NINJA_COLLISION_Y } from '../constants/NinjaConstants';

export default class Obstacle extends Phaser.Sprite {
  constructor( game, x, y, velocity, initScale ) {
    super( game, x, y, 'bush' );
    this.initScale = initScale;

    this.sentSignal = false;
    this.onCollisionZoneEnter = new Phaser.Signal();

    this.game.physics.enable( this, Phaser.Physics.ARCADE );
    this.game.physics.setBoundsToWorld();

    this.anchor.setTo( 0.5, 0 );

    this.scale.setTo( this.initScale );

    this.body.velocity.y = velocity.y;
    this.body.velocity.x = velocity.x;

    this.checkWorldBounds = true;

    this.events.onOutOfBounds.add( () => {
      this.destroy();
    }, this );

    this.game.world.add( this );
  }

  updateObstacle() {
    this.scale.setTo( ( 1 - this.initScale ) * ( this.body.y / this.game.world.height ) + this.initScale );

    if ( !this.sentSignal && this.body.y >= NINJA_COLLISION_Y ) {
      this.sentSignal = true;
      this.onCollisionZoneEnter.dispatch( this );
    }
  }
}
