export default class Shuriken extends Phaser.Sprite {
  constructor( game, xStart, yStart, xEnd, yEnd ) {
    super( game, xStart, yStart, 'bush' )

    this.scale.setTo( 0.2 );
    this.anchor.setTo( 0.5 );

    this.game.world.add( this );

    this.game.add.tween( this ).to( { x: xEnd, y: yEnd, angle: 720 }, 1000, 'Linear', true );
  }
}
