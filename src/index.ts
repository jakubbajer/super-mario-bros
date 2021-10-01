import Game from './components/Game';
import './style.css';

const container: HTMLCanvasElement = document.querySelector("canvas#game")!;

const game = new Game(container);