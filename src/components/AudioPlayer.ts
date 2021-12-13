class AudioPlayer {
  static playAudio(audioPath: any, repeatable?: true) {
    const audio = new Audio(audioPath);
    audio.volume = 0.3;
    audio.play();
    if (repeatable) {
      audio.onended = () => {
        audio.play();
      };
    }
  }
}

export default AudioPlayer;