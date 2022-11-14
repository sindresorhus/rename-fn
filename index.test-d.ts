import {expectType} from 'tsd';
import renameFunction from './index.js';

function foo() { /* noop */ }
const bar = () => 42;
expectType<typeof foo>(renameFunction(foo, 'unicorn'));
expectType<typeof bar>(renameFunction(bar, 'unicorn'));
