import {expectType} from 'tsd';
import renameFunction from './index.js';

function f() {}
const g = () => {}
expectType<typeof f>(renameFunction(f, 'foo'));
expectType<typeof g>(renameFunction(g, 'bar'));
