import {expectType} from 'tsd';
import renameFunction from './index.js';

function foo() {}
const bar = () => {}
expectType<typeof foo>(renameFunction(foo, 'unicorn'));
expectType<typeof bar>(renameFunction(bar, 'unicorn'));
