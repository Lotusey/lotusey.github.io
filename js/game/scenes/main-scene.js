export class MainScene extends Phaser.Scene {
    constructor(){
        super({key: 'MainScene'});
        console.log('Main scene is created!');
    }

    init() {
        console.log('init method called');
    }

    preload() {
        console.log('preload method called');
        this.load.image('background', 'assets/tilemaps/pewterCity.png');
    }
    
    create() {
        console.log('create method called');
        const gameWidth = this.scale.width;
        const gameHeight = this.scale.height;
        const background = this.add.image(0, 0, 'background');
        background.setPosition(gameWidth / 2, gameHeight / 2);
    }
    
    update() {
        console.log('update method called');
    }

}