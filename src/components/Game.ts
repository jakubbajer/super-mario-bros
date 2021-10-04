import AudioPlayer from "./AudioPlayer";
import Level from "./Level";
import Renderer from "./Renderer";
import theme from "../../assets/sounds/theme.mp3";

class Game {
  canvas: HTMLCanvasElement;
  level: Level | undefined;
  audioPlayer: AudioPlayer;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.audioPlayer = new AudioPlayer();
    this.init();
  }

  init() {
    this.level = new Level(1, this.canvas);
    // this.audioPlayer.playAudio(theme, true);
  }
}

export default Game;