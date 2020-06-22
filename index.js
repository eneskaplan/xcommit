#!/usr/bin/env node
'use strict';

const meow = require('meow');
const XproCommit = require('./src/xpro-commit.js');
const pkg = require('./package.json');

const cli = meow(`
	Usage
	  $ xpro-commit
`, {
  alias: {
    i: 'init',
    c: 'commit',
    l: 'list',
    s: 'search',
    h: 'help',
    v: 'version',
    g: 'config'
  }
});

const xproCommit = new XproCommit();

const commands = {
  config: () => xproCommit.config(),
  version: () => console.log(xproCommit.version(pkg.version)),
  commit: () => xproCommit.ask('client'),
  help: () => cli.showHelp()
};

const arg = Object.keys(cli.flags)[0];
console.log("a", cli)
if (commands[arg]) {
  commands[arg]();
} else {
  xproCommit.run()
}
