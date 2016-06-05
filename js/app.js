var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var speed = 100;
var gameWidth = 3024;
var gameHeight = 3024;
/** @var game Phaser **/
var game = new Phaser.Game(windowWidth, windowHeight, Phaser.AUTO, '', {preload: preload, create: create, update: update, render: render});

var debugCtx;

var showDebug = true;
var tree;
function preload() {
    // Add the Isometric plug-in to Phaser
    game.plugins.add(new Phaser.Plugin.Isometric(game));

    // Set the world size
    game.world.setBounds(0, 0, gameWidth * 2, gameHeight * 2);

    // Start the physical system
    game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);

    // set the middle of the world in the middle of the screen
    game.iso.anchor.setTo(0.5, 0);

    game.load.image('grass', 'assets/grass.png');
    game.load.spritesheet('characterAnim', 'assets/worker.png', 72, 72);
    game.load.image('tree-small-red-berrys', 'assets/tree-small-red-berrys.png');
    game.load.image('raspberry-bush', 'assets/raspberry-bush.png');

}

function create() {

    floorGroup = game.add.group();
    
    itemGroup = game.add.group();
    grassGroup = game.add.group();
    graphicsGroup = game.add.group();
    obstacleGroup = game.add.group();
    treeGroup = game.add.group();
    fruitBush = game.add.group();
    targetable = [];

    var grassTile;
    for (var xt = gameWidth; xt > 0; xt -= 35) {
        for (var yt = gameHeight; yt > 0; yt -= 35) {

            var rnd = Math.floor(Math.random() * 3);

            if (rnd == 0) {
                grassTile = game.add.isoSprite(xt, yt, 0, 'grass', 0, grassGroup);
                grassTile.anchor.set(0.5);
            } else if (rnd == 1)
            {
                grassTile = game.add.isoSprite(xt, yt, 0, 'grass', 0, grassGroup);
                grassTile.anchor.set(0.5);
            } else if (rnd == 2)
            {
                grassTile = game.add.isoSprite(xt, yt, 0, 'grass', 0, grassGroup);
                grassTile.anchor.set(0.5);
            }
        }
    }
    tree;
    for (var xt = 0; xt < gameWidth; xt += 35) {
        for (var yt = 0; yt < gameHeight; yt += 35) {

            var rnd = Math.floor(Math.random() * 500);

            if (rnd == 1)
            {
                tree = game.add.isoSprite(xt, yt, 0, 'tree-small-red-berrys', 0, treeGroup);
                tree.anchor.set(0.5);
                game.physics.isoArcade.enable(tree);
                tree.body.collideWorldBounds = true;
                tree.body.immovable = true;
                tree.hits = 3;
                tree.gives = {wood: 3};
                targetable.push(tree);
            }
        }
    }
    for (var xt = 0; xt < gameWidth; xt += 35) {
        for (var yt = 0; yt < gameHeight; yt += 35) {

            var rnd = Math.floor(Math.random() * 500);

            if (rnd == 1)
            {
                bush = game.add.isoSprite(xt, yt, 0, 'raspberry-bush', 0, fruitBush);
                bush.anchor.set(0.5);
                game.physics.isoArcade.enable(bush);
                bush.body.collideWorldBounds = true;
                bush.body.immovable = true;
                bush.hits = 3;
                bush.gives = {berries: 3};

                targetable.push(bush);
            }
        }
    }

    player = game.add.isoSprite(350, 280, 0, 'characterAnim', 0, obstacleGroup);


    // add the animations from the spritesheet
    player.animations.add('S', [4, 9, 14, 19, 24], 10, true);
    player.animations.add('N', [0, 5, 10, 15, 20], 10, true);
    player.animations.add('NE', [1, 6, 11, 16, 21], 10, true);
    player.animations.add('E', [2, 7, 12, 17, 22], 10, true);
    player.animations.add('SE', [3, 8, 13, 18, 23], 10, true);

    player.anchor.set(0.5, 0.5);


    // enable physics on the player
    game.physics.isoArcade.enable(player);
    player.body.widthX = 25;
    player.body.widthY = 25;
    player.body.height = 20;
    player.body.collideWorldBounds = true;
    player.materials = {};
    
    keyW = game.input.keyboard.isDown(87);
    keyA = game.input.keyboard.isDown(65);
    keyS = game.input.keyboard.isDown(83);
    keyD = game.input.keyboard.isDown(68);
    game.camera.follow(player);
    
    targetDraw = game.add.graphics(0, 0, graphicsGroup);
    targeter = new Targeter(targetDraw, targetable);
    
//    cursorPos = new Phaser.Plugin.Isometric.Point3();
//    bodyPos = new Phaser.Plugin.Isometric.Point3();
    
    hitKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    actions = new Actions();
    hitKey.onDown.add(function(){
        if(typeof target == 'undefined') return;
        actions.hitAction(target, player);
    }, this);
    game.input.onDown.add(function () {
        targeter.targetOnClick();
    });
    buildScreen = new BuildScreen();
    buildScreenKey = game.input.keyboard.addKey(66);
    buildScreenKey.onDown.add(triggerBuildScreen, this);

    playerHelper = new PlayerHelper(player);
    debug = new Debug(false);
}

function update() {
    playerHelper.moveCheck();
    game.physics.isoArcade.collide(treeGroup, player);
}

function render() {
    if (debug.display)
    {
        debug.debugGroupBody(fruitBush);
    }
}

function flipSprite(sprite, dir) {
    if (dir === 'left' && sprite.scale.x !== -1) {
        sprite.scale.x = -1;
    }
    if (dir === 'right' && sprite.scale.x !== 1) {
        sprite.scale.x = 1;
    }
}

function triggerBuildScreen() {
    var buildScreenDiv = document.getElementById('buildScreen');
    if (buildScreenDiv.style.display === "none") {
        buildScreenDiv.style.display = "block";
        buildScreenDiv.style.width = buildScreen.width;
        buildScreenDiv.style.height = buildScreen.height;
    } else {
        buildScreenDiv.style.display = "none";
    }
}

