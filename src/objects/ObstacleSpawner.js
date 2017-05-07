import Obstacle from './Obstacle';
import { SIDE_RAIL_CENTER, OBSTACLE_VELOCITY_X, OBSTACLE_VELOCITY_Y, SIDE_RAIL_SCALE, CENTER_RAIL_SCALE } from '../constants/ObstacleConstants';

export default class ObstacleSpawner {
  constructor( game ) {
    this.game = game;

    this.obstacles = this.game.add.group();

    this.spawnObstacle();
  }

  spawnObstacle() {
    this.obstacles.add( new Obstacle( this.game, this.game.width / 2, 0, { x: 0, y: OBSTACLE_VELOCITY_X }, CENTER_RAIL_SCALE ) );

    this.obstacles.add( new Obstacle( this.game, SIDE_RAIL_CENTER, 0, { x: -OBSTACLE_VELOCITY_Y, y: OBSTACLE_VELOCITY_X }, SIDE_RAIL_SCALE ) );

    this.obstacles.add( new Obstacle( this.game, this.game.width - SIDE_RAIL_CENTER, 0, { x: OBSTACLE_VELOCITY_Y, y: OBSTACLE_VELOCITY_X }, SIDE_RAIL_SCALE ) );
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
