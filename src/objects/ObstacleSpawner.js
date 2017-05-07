import Obstacle from './Obstacle';

export default class ObstacleSpawner {
  constructor( game ) {
    this.game = game;

    this.obstacles = this.game.add.group();

    this.spawnObstacle();
  }

  spawnObstacle() {
    this.obstacles.add( new Obstacle( this.game, 960, 0 ) );
  }

  updateObstacles() {
    this.obstacles.forEach( ( obstacle ) => {
      obstacle.updateObstacle();
    } );
  }
}
