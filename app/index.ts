import {CaveGenerator} from './scripts/CaveGenerator';
import './styles/main.scss';

let generator:CaveGenerator = new CaveGenerator();

let root:HTMLElement = document.getElementById('root');
root.innerHTML = generator.generate();