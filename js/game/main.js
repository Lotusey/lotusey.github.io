import { BootScene } from './scenes/boot-scene.js';
import { PreLoadScene } from './scenes/preload-scene.js';
import { MainScene } from './scenes/main-scene.js';

const config = {
    type: Phaser.AUTO,
    scene: MainScene,
    //scene: [BootScene, PreLoadScene, MainScene],
    backgroundColor: '#000000',
    
    scale: {
        width: 300,
        height: 200,
        mode: Phaser.Scale.FIT,
    },
    render: {
        pixelArt: true,
        antialias: false,
    },
    resolution: window.devicePixelRatio,

    physics:{
        default: 'arcade'
    },
};


const game = new Phaser.Game(config);
