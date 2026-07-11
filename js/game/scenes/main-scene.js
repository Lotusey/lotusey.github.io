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
        //this.load.image('player', 'assets/sprites/MeStanding.png');
        this.load.spritesheet('player', 'assets/sprites/walking_animation.png', {
            frameWidth: 100,
            frameHeight: 90,
        });
    }
    
    create() {
        console.log('create method called');
        const gameWidth = this.scale.width;
        const gameHeight = this.scale.height;
        const background = this.add.image(0, 0, 'background');
        background.setPosition(gameWidth / 2, gameHeight / 2);

        this.player = this.add.sprite(gameWidth / 2, gameHeight / 2, 'player');
        this.player.setDepth(2);
        //this.player.setPosition(gameWidth / 2, gameHeight / 2);
        this.player.setOrigin(0.5,0.5);
        this.player.setScale(0.25);

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
                repeat: 0,     
        });

        this.anims.create({
                key: 'walk_up',
                frames: this.anims.generateFrameNumbers('player', {
                    frames: [3, 4, 5],
                }),    
                frameRate: 6,
                repeat: 0,     
        });

        this.anims.create({
                key: 'walk_left',
                frames: this.anims.generateFrameNumbers('player', {
                    frames: [6, 7, 8],
                }),    
                frameRate: 6,
                repeat: 0,     
        });

        this.anims.create({
                key: 'walk_right',
                frames: this.anims.generateFrameNumbers('player', {
                    frames: [9, 10, 11],
                }),    
                frameRate: 6,
                repeat: 0,     
        });
    }
    
    update(time, delta) {
        console.log('update method called');

        const speed = 60; 
        let velocityX = 0;
        let velocityY = 0;

        if (this.cursors.left.isDown || this.keys.A.isDown){
            velocityX = -speed;
            this.player.play('walk_left', true);
        }
        else if (this.cursors.right.isDown || this.keys.D.isDown){
            velocityX = speed;
            this.player.play('walk_right', true);
        }

        if (this.cursors.up.isDown || this.keys.W.isDown){
            velocityY = -speed;
            this.player.play('walk_up', true);
        }
        else if (this.cursors.down.isDown || this.keys.S.isDown){
            velocityY = speed;
            this.player.play('walk_down', true);
        }
        if (velocityX == 0 && velocityY == 0){
            this.player.stop();
        }

    //normalizing diagonal speed
    if (velocityX !== 0 || velocityY !== 0){
        const magnitude = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
        velocityX = (velocityX / magnitude) * speed;
        velocityY = (velocityY / magnitude) * speed;
    }

    this.player.x += velocityX * (delta / 1000);
    this.player.y += velocityY * (delta / 1000);

    }

}