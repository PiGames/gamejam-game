const NINJA_COLLISION_Y = 680;

export default class Obstacle extends Phaser.Sprite {
  constructor( game, x, y ) {
    super( game, x, y, 'bush' );

    this.sentSignal = false;
    this.onCollisionZoneEnter = new Phaser.Signal();

    this.game.physics.enable( this, Phaser.Physics.ARCADE );
    this.game.physics.setBoundsToWorld();

    this.anchor.setTo( 0.5, 0 );

    this.scale.setTo( 0.3 );

    this.body.velocity.y = 300;

    this.checkWorldBounds = true;

    this.events.onOutOfBounds.add( () => {
      this.destroy();
    }, this );

    this.game.world.add( this );
  }

  updateObstacle() {
    this.scale.setTo( 0.7 * ( this.body.y / this.game.world.height ) + 0.3 )


    if ( !this.sentSignal && this.body.y >= NINJA_COLLISION_Y ) {
      this.sentSignal = true;
      this.onCollisionZoneEnter.dispatch( this );
    }
  }
}
