import Obstacle from './Obstacle';
import { SIDE_RAIL_CENTER, OBSTACLE_VELOCITY_X, OBSTACLE_VELOCITY_Y, SIDE_RAIL_SCALE, CENTER_RAIL_SCALE, RAIL_OPTIONS } from '../constants/ObstacleConstants';

export default class ObstacleSpawner {
  constructor( game, ninjaCheckForCollision ) {
    this.game = game;

    this.ninjaCheckForCollision = ninjaCheckForCollision;

    this.obstacles = this.game.add.group();

    this.onObstacleSpawn = new Phaser.Signal();

    this.spawnObstacle();

    this.game.time.events.loop( Phaser.Timer.SECOND * 2, this.spawnObstacle, this );
  }

  spawnObstacle() {
    const railOptions = RAIL_OPTIONS( this.game.width );
    const index = this.game.rnd.integerInRange( 0, railOptions.length - 1 );
    const currentOption = railOptions[ index ];

    const newObstacle = this.obstacles.add( new Obstacle( this.game, currentOption.x, currentOption.y, currentOption.velocity, currentOption.scale ) );
    newObstacle.onCollisionZoneEnter.add( this.ninjaCheckForCollision );
    this.onObstacleSpawn.dispatch();
  }

  setOnCollisionHandler( callback ) {
    this.obstacles.forEach( ( obstacle ) => {
      obstacle.onCollisionZoneEnter.add( callback );
    } );
  }

  updateObstacles() {
    this.obstacles.forEach( ( obstacle ) => {
      obstacle.updateObstacle();
    } );
  }
}
