import GameUI from '../UI/GameUI';
import Ninja from '../objects/Ninja';

export default class Game extends Phaser.State {
  create() {
    this.gameUI = new GameUI( this );

    this.camera.resetFX();
    this.camera.flash( 0x000000, 500, false );

    this.game.onResume.add( () => {
      if ( this.gameUI.stateStatus !== 'playing' ) {
        this.game.time.events.pause();
      }
    } );

    this.initNinja();
  }
  initNinja(){
    this.ninja = new Ninja( this.game, 500, 500, 'ninja' );
  }
  update() {
    this.gameUI.updateUI();
  }
}
