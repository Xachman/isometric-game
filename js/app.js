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
//    player.animations.add('SW', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
//    player.animations.add('W', [16, 17, 18, 19, 20, 21, 22, 23], 10, true);
//    player.animations.add('NW', [24, 25, 26, 27, 28, 29, 30, 31], 10, true);
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
    player.items = {};
    keyW = game.input.keyboard.isDown(87);
    // keyW.onUp.
    keyA = game.input.keyboard.isDown(65);
    keyS = game.input.keyboard.isDown(83);
    keyD = game.input.keyboard.isDown(68);
    spacebar = game.camera.follow(player);
    debugCtx = game.add.graphics(0, 0);
    targetDraw = game.add.graphics(0, 0, graphicsGroup);
    targeter = new Targeter(targetDraw, targetable);
    hitKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    actions = new Actions();
    hitKey.onDown.add(function(){
        if(target)
        actions.hitAction(target, player);
    }, this);

    buildScreenKey = game.input.keyboard.addKey(66);
    buildScreenKey.onDown.add(triggerBuildScreen, this);
    cursorPos = new Phaser.Plugin.Isometric.Point3();
    bodyPos = new Phaser.Plugin.Isometric.Point3();
    game.input.onDown.add(function () {
        targeter.targetOnClick();
    });




}

function update() {
    moveCharCheck();
    game.physics.isoArcade.collide(treeGroup, player);

    //player.body.velocity.y = -speed;
    //player.body.velocity.x = -speed;

}


function moveCharCheck() {
    var speed = 10;
    var maxSpeed = 400;
    var keyW = game.input.keyboard.isDown(87),
            keyA = game.input.keyboard.isDown(65),
            keyS = game.input.keyboard.isDown(83),
            keyD = game.input.keyboard.isDown(68),
            x = player.body.velocity.x,
            y = player.body.velocity.y;

    if (keyW && keyD) {
        100
        player.animations.play('NE');
        player.direction = 'NE';
        flipSprite(player, 'right');
        x = 0;
        y = -checkSpeed(speed * 2, maxSpeed * 2, y);
    } else if (keyW && keyA) {
        player.animations.play('NE');
        player.direction = 'NW';
        flipSprite(player, 'left');
        y = 0;
        x = -checkSpeed(speed * 2, maxSpeed * 2, x);
    } else if (keyS && keyA) {
        player.animations.play('SE');
        player.direction = 'SW';
        flipSprite(player, 'left');
        y = checkSpeed(speed * 2, maxSpeed * 2, y);
        x = 0;
    } else if (keyS && keyD) {
        player.animations.play('SE');
        player.direction = 'SE';
        flipSprite(player, 'right');
        y = 0;
        x = checkSpeed(speed * 2, maxSpeed * 2, x);
    } else if (keyW) {
        player.animations.play('N');
        player.direction = 'N';
        flipSprite(player, 'right');
        y = checkSpeed(-speed, -maxSpeed, y);
        x = checkSpeed(-speed, -maxSpeed, x);
    } else if (keyS)
    {
        player.animations.play('S');
        player.direction = 'S';
        flipSprite(player, 'right');
        y = checkSpeed(speed, maxSpeed, y);
        x = checkSpeed(speed, maxSpeed, x);
    } else if (keyD) {
        player.animations.play('E');
        player.direction = 'E';
        flipSprite(player, 'right');
        x = checkSpeed(speed, maxSpeed, x);
        y = checkSpeed(-speed, -maxSpeed, y);
    } else if (keyA)
    {
        player.animations.play('E');
        player.direction = 'W';
        flipSprite(player, 'left');
        x = checkSpeed(-speed, -maxSpeed, x);
        y = checkSpeed(speed, maxSpeed, y);
    } else
    {
        player.animations.stop();
        x = 0;
        y = 0;
    }

    player.body.velocity.x = x;
    player.body.velocity.y = y;
}
function render() {

    if (showDebug)
    {
//        for (var i = 0; i < fruitBush.children.length; i++) {
//            var child = fruitBush.children[i];
//            game.debug.bodyInfo(child, 32, 32);
//            game.debug.body(child);
//        }
//        var count = 0;
//        for (var i = 0; i < treeGroup.children.length; i++) {
//            var child = treeGroup.children[i];
//            game.debug.bodyInfo(child, 32, 32);
//            game.debug.body(child);
//            
//        }
//        
//        game.debug.bodyInfo(player, 32, 32);
//        game.debug.body(player);

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
function addItems(obj) {
    for (item in obj) {
        if (!player.items[item]) {
            player.items[item] = 0;
        }
        player.items[item] += obj[item]
    }
}

function checkSpeed(speed, max, target) {
    result = speed + target;
    //console.log(max);
    if (result > max || result < max) {
        return max;
    }
    return result;
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
function drawDebug() {
    for (var i = 0; i < targetable.length; i++) {
        var child = targetable[i];
        // game.iso.projectXY({x: child.isoX, y: child.isoY}, bodyPos);
        var x = child.x - 100 - child.width / 2;
        var y = child.y - 100 - child.height / 2;
        game.iso.unproject({x: x, y: y}, bodyPos);
        console.log(bodyPos);

        debugCtx.lineStyle(0);
        console.log(' childX: ' + child.body.x + ' childY: ' + child.body.y + ' width: ' + child.width + ' height: ' + child.height);
        debugCtx.beginFill(0xFF3300);
        debugCtx.drawCircle(x, y, 10);
        debugCtx.endFill();

    }
}

