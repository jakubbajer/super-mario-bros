import Game from './components/Game';
import './style.css';

const container: HTMLCanvasElement = document.querySelector("canvas#game")!;

let game: Game | undefined;
window.addEventListener("click", () => {
  if (!game)
    game = new Game(container);
});