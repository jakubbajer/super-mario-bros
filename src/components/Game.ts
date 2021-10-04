import AudioPlayer from "./AudioPlayer";
import Controls from "./Controls";
import Level from "./Level";
import Player from "./Player";
import Renderer from "./Renderer";
import theme from "../../assets/sounds/theme.mp3";

class Game {
  canvas: HTMLCanvasElement;
  renderer: Renderer;
  level: Level | undefined;
  audioPlayer: AudioPlayer;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.renderer = new Renderer(canvas);
    this.renderer.render();
    this.audioPlayer = new AudioPlayer();
    this.init();
  }

  init() {
    this.level = new Level(1, this.canvas, this.renderer);
    // this.audioPlayer.playAudio(theme, true);
  }
}

export default Game;