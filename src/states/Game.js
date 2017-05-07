import GameUI from '../UI/GameUI';
import Ninja from '../objects/Ninja';

import ObstacleSpawner from "../objects/ObstacleSpawner";

export default class Game extends Phaser.State {
  create() {
    this.game.add.sprite( 0, 0, 'background' );

    this.gameUI = new GameUI( this );

    this.camera.resetFX();
    this.camera.flash( 0x000000, 500, false );

    this.game.onResume.add( () => {
      if ( this.gameUI.stateStatus !== 'playing' ) {
        this.game.time.events.pause();
      }
    } );

    this.ObstacleSpawner = new ObstacleSpawner( this.game );
    this.ninja = new Ninja( this.game, 500, 500, 'ninja' );

    this.ObstacleSpawner.setOnCollisionHandler( this.ninja.checkForCollision.bind( this.ninja ) );

    this.ninja.onDeath.add( this.gameUI.stateGameover.bind( this.gameUI ) );
  }
  update() {
    this.gameUI.updateUI();

    this.ObstacleSpawner.updateObstacles();
  }
}
