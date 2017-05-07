export default class Ninja extends Phaser.Sprite{
  constructor( game, x, y, key ){
    super( game, x, y, key );

    this.game.world.add(this);
  }
}
