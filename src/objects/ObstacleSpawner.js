import Obstacle from './Obstacle';
import Coin from './Coin';
import { SIDE_RAIL_CENTER, OBSTACLE_VELOCITY_X, OBSTACLE_VELOCITY_Y, SIDE_RAIL_SCALE, CENTER_RAIL_SCALE, RAIL_OPTIONS } from '../constants/ObstacleConstants';

export default class ObstacleSpawner {
  constructor( game, ninjaCheckForCollision ) {
    this.game = game;

    this.ninjaCheckForCollision = ninjaCheckForCollision;

    this.obstacles = this.game.add.group();

    this.onObstacleSpawn = new Phaser.Signal();
    this.addPoints = new Phaser.Signal();
  }

  spawnObstacle() {
    let railOptions = RAIL_OPTIONS( this.game.width );
    const index = this.game.rnd.integerInRange( 0, railOptions.length - 1 );
    const currentOption = railOptions[ index ];

    const newObstacle = this.obstacles.add( new Obstacle( this.game, currentOption.x, currentOption.y, currentOption.velocity, currentOption.scale ) );
    newObstacle.onCollisionZoneEnter.add( this.ninjaCheckForCollision );

    railOptions.splice( index, 1 );

    const coinIndex = this.game.rnd.integerInRange( 0, railOptions.length - 1 );
    const currentCoinOption = railOptions[ coinIndex ];

    const newCoin = this.obstacles.add( new Coin( this.game, currentCoinOption.x, currentCoinOption.y, currentCoinOption.velocity, currentCoinOption.scale ) );
    newCoin.onCollisionZoneEnter.add( () => {
      this.addPoints.dispatch();
    } );

    this.onObstacleSpawn.dispatch();
  }

  initSpawning() {
    this.spawnObstacle();
    this.game.time.events.loop( Phaser.Timer.SECOND * 2, this.spawnObstacle, this );
  }
}
