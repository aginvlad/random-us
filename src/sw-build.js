const workboxBuild = require('workbox-build');

const buildSW = () => {
  return workboxBuild.injectManifest({
    globDirectory: 'build',
    globPatterns: [
      '**\/*.{html,ico,json,gif,css,map,js,eot,ttf,woff,woff2}',
    ],
    swSrc: 'src/sw-base.js',
    swDest: 'build/sw.js'
  });
}

buildSW();