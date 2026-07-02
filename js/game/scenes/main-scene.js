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
        this.load.image('background', 'assets/tilemaps/example_pewter2.png');
        this.load.image('player', 'assets/sprites/MeStanding.png');
    }
    
    create() {
        console.log('create method called');
        const gameWidth = this.scale.width;
        const gameHeight = this.scale.height;
        const background = this.add.image(0, 0, 'background');
        background.setPosition(gameWidth / 2, gameHeight / 2);

        const player = this.add.image(0, 0, 'player');
        player.setDepth(2);
        player.setPosition(gameWidth / 2, gameHeight / 2);
        player.setOrigin(0.5,0.5);
        player.setScale(0.25);
    }
    
    update() {
        console.log('update method called');
    }

}