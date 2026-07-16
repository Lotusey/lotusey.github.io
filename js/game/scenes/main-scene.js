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
        this.load.spritesheet('player', 'assets/sprites/walking_animation.png', {
            frameWidth: 100,
            frameHeight: 90,
        });
    }
    
    create() {
        //logging
        console.log('create method called');

        //Setting up the background image
        const gameWidth = this.scale.width;
        const gameHeight = this.scale.height;
        const background = this.add.image(0, 0, 'background');
        background.setPosition(gameWidth / 2, gameHeight / 2);

        //Player sprite settings
        this.player = this.physics.add.sprite(gameWidth / 2, gameHeight / 2, 'player');
        this.player.setScale(0.25);
        this.player.setOrigin(0.5,0.5);
        this.player.body.setCollideWorldBounds(true);
        this.player.body.allowGravity = false;
        this.player.setDepth(2);

        //Camera settings
        this.cameras.main.startFollow(this.player);

        //Physics settings
        this.physics.world.setBounds(background.x - background.width / 2, background.y - background.height / 2, background.width, background.height);
        this.physics.world.setBoundsCollision(true, true, true, true);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({
            W: Phaser.Input.Keyboard.KeyCodes.W,
            A: Phaser.Input.Keyboard.KeyCodes.A,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            D: Phaser.Input.Keyboard.KeyCodes.D,
        });

        this.anims.create({
                key: 'walk_down',
                frames: this.anims.generateFrameNumbers('player', {
                    frames: [0, 1, 2],
                }),    
                frameRate: 6,
                repeat: -1,     
        });

        this.anims.create({
                key: 'walk_up',
                frames: this.anims.generateFrameNumbers('player', {
                    frames: [3, 4, 5],
                }),    
                frameRate: 6,
                repeat: -1,     
        });

        this.anims.create({
                key: 'walk_left',
                frames: this.anims.generateFrameNumbers('player', {
                    frames: [6, 7, 8],
                }),    
                frameRate: 6,
                repeat: -1,     
        });

        this.anims.create({
                key: 'walk_right',
                frames: this.anims.generateFrameNumbers('player', {
                    frames: [9, 10, 11],
                }),    
                frameRate: 6,
                repeat: -1,     
        });
    }
    
    update(time, delta) {
        console.log('update method called');

        const speed = 100; 

        const left = this.cursors.left.isDown || this.keys.A.isDown;
        const right = this.cursors.right.isDown || this.keys.D.isDown;
        const up = this.cursors.up.isDown || this.keys.W.isDown;
        const down = this.cursors.down.isDown || this.keys.S.isDown;

        let velocityX = 0;
        let velocityY = 0;
        let animKey = null;
        
        if (left && !right){
            velocityX = -speed;
            animKey = 'walk_left';
        }
        else if (right && !left){
            velocityX = speed;
            animKey = 'walk_right';
        }
        else if (up && !down){
            velocityY = -speed;
            animKey = 'walk_up';
        }
        else if(down && !up){
            velocityY = speed;
            animKey = 'walk_down';
        }

        if (animKey){
            this.player.play(animKey, true);
        }
        else{
            this.player.play({key: 'animKey', startFrame: 0}, true);
        }

    this.player.x += velocityX * (delta / 1000);
    this.player.y += velocityY * (delta / 1000);

    }

}