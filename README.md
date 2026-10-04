# yonaka (夜中)

a HUD for MidnightSumo! yonaka in Japanese is "midnight" or "middle of the night". Quite fitting for our favorite Twitch sumo streamer!

## How to use this

Currently, this HUD is all static HTML and vanilla JS/CSS. Point OBS to a browser source and add `#obs` to get the background transparent:

```sh
https://quaran.to/yonaka/#obs
```

## Install / Formatting

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
