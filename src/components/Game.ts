import AudioPlayer from "./AudioPlayer";
import Level from "./Level";
import theme from "../../assets/sounds/theme.mp3";
import FpsController from "./FpsController";

class Game {
  canvas: HTMLCanvasElement;
  level: Level;
  audioPlayer: AudioPlayer;
  fpsController: FpsController;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.level = new Level(1, this.canvas);
    this.audioPlayer = new AudioPlayer();
    this.fpsController = new FpsController(60, this.update); // limits the refresh rate to 60 fps on 144 hz displays
    this.init();
  }

  init() {
    // this.audioPlayer.playAudio(theme, true);
    this.fpsController.start();
  }

  // executed as a callback of fpsControler loop (once a second)
  // the 'game clock', updates the game
  // namely: player position, camera, enemies, triggers
  update = () => {
    this.level.player.controls.executeFlags(); // triggers input
    this.level.player.update(); // updates player and camera
  };
}

export default Game;