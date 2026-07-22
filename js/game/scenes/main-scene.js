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
        //pre-loading tile maps and player character
        this.load.image('tileset1', 'assets/tilemaps/FR_TS1.png');
        this.load.image('tileset2', 'assets/tilemaps/FR_TS2.png');
        this.load.image('tileset3', 'assets/tilemaps/FR_TS3.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/Main_Scene.json');
        this.load.spritesheet('player', 'assets/sprites/walking_animation.png', {
            frameWidth: 100,
            frameHeight: 90,
        });
    }
    
    create() {
        //logging
        console.log('create method called');

        //Setting up the game world & tilemap
        const gameWidth = this.scale.width;
        const gameHeight = this.scale.height;
        
        const map = this.make.tilemap({key: 'map'});
        const tileset1 = map.addTilesetImage('FR_TS1', 'tileset1');
        const tileset2 = map.addTilesetImage('FR_TS2', 'tileset2');
        const tileset3 = map.addTilesetImage('FR_TS3', 'tileset3'); 

        map.createLayer ('Group 1/Tile Layer 1', [tileset1, tileset2, tileset3], 0, 0);
        map.createLayer ('Group 1/Tile Layer 2', [tileset1, tileset2, tileset3], 0, 0);
        const collisionLayer = map.getObjectLayer('Object Layer 1');

        //Player sprite settings
        this.player = this.physics.add.sprite(535, 395, 'player'); //Reminder: here we can change starting position of user
        this.player.setScale(0.25);
        this.player.setOrigin(0.5,0.5);
        this.player.body.setCollideWorldBounds(true);
        this.player.body.allowGravity = false;
        this.collisionGroup = this.physics.add.staticGroup();
        this.player.setDepth(2);

        //creation of collision layer
        collisionLayer.objects.forEach((obj) => {
            const rect = this.add.rectangle(obj.x, obj.y, obj.width, obj.height);
            rect.setOrigin(0, 0);
            rect.setVisible(false); 
            rect.setFillStyle(0xff0000, 0.5);
            this.physics.add.existing(rect, true);
            this.collisionGroup.add(rect);
        });

        this.physics.add.collider(this.player, this.collisionGroup);

        //Camera settings
        this.cameras.main.startFollow(this.player);

        //Physics settings
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.world.setBoundsCollision(true, true, true, true);

        //key inputs
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({
            W: Phaser.Input.Keyboard.KeyCodes.W,
            A: Phaser.Input.Keyboard.KeyCodes.A,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            D: Phaser.Input.Keyboard.KeyCodes.D,
        });

        //animations for player
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

        const speed = 60; 
        //const speed = 120; //adjust speed for testing purposes

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
        //for now, if nothing is pressed, the player will look at user. 
        else{
            this.player.play({key: 'walk_down', startFrame: 1}, false);
        }


    this.player.setVelocity(velocityX, velocityY);

    }

}