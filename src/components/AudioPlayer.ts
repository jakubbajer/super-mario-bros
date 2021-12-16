class AudioPlayer {
  theme: HTMLAudioElement;

  constructor(themePath: any) {
    this.theme = new Audio(themePath);
    this.theme.volume = 0.05;
    this.theme.play();
    this.theme.onended = () => {
      this.theme.play();
    };
  }

  static playAudio(audioPath: any) {
    const audio = new Audio(audioPath);
    audio.volume = 0.2;
    audio.play();
  }
}

export default AudioPlayer;