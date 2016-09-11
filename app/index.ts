import {CaveGenerator} from './scripts/CaveGenerator';
import {Dungeon} from './scripts/Dungeon';
import './styles/main.scss';

let generator:CaveGenerator = new CaveGenerator();
let dungeon = new Dungeon();

let root:HTMLElement = document.getElementById('root');
root.innerHTML = generator.generate();