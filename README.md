# yonaka

a HUD for MidnightSumo

## Formatting

JS, CSS, and HTML are formatted with [Prettier](https://prettier.io). You'll need Node.js installed.

### Node.js via asdf

The Node version is pinned in `.tool-versions` for [asdf](https://asdf-vm.com). If you use asdf, install it with:

```sh
asdf plugin add nodejs # one time, if you don't have the plugin yet
asdf install           # installs the node version from .tool-versions
```

### Running Prettier

```sh
npm install          # one time, installs Prettier
npm run format       # format everything in place
npm run format:check # check formatting without changing files
```
