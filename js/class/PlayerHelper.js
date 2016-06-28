PlayerHelper = function (player) {
    this.player = player;
    this.moveCheck = function () {
        var speed = 10;
        var maxSpeed = 400;
        var keyW = game.input.keyboard.isDown(87),
                keyA = game.input.keyboard.isDown(65),
                keyS = game.input.keyboard.isDown(83),
                keyD = game.input.keyboard.isDown(68),
                x = this.player.body.velocity.x,
                y = this.player.body.velocity.y;

        if (keyW && keyD) {
            100
            this.player.animations.play('NE');
            this.player.direction = 'NE';
            flipSprite(this.player, 'right');
            x = 0;
            y = -this.checkSpeed(speed * 2, maxSpeed * 2, y);
        } else if (keyW && keyA) {
            this.player.animations.play('NE');
            this.player.direction = 'NW';
            flipSprite(this.player, 'left');
            y = 0;
            x = -this.checkSpeed(speed * 2, maxSpeed * 2, x);
        } else if (keyS && keyA) {
            this.player.animations.play('SE');
            this.player.direction = 'SW';
            flipSprite(this.player, 'left');
            y = this.checkSpeed(speed * 2, maxSpeed * 2, y);
            x = 0;
        } else if (keyS && keyD) {
            this.player.animations.play('SE');
            this.player.direction = 'SE';
            flipSprite(this.player, 'right');
            y = 0;
            x = this.checkSpeed(speed * 2, maxSpeed * 2, x);
        } else if (keyW) {
            this.player.animations.play('N');
            this.player.direction = 'N';
            flipSprite(this.player, 'right');
            y = this.checkSpeed(-speed, -maxSpeed, y);
            x = this.checkSpeed(-speed, -maxSpeed, x);
        } else if (keyS)
        {
            this.player.animations.play('S');
            this.player.direction = 'S';
            flipSprite(this.player, 'right');
            y = this.checkSpeed(speed, maxSpeed, y);
            x = this.checkSpeed(speed, maxSpeed, x);
        } else if (keyD) {
            this.player.animations.play('E');
            this.player.direction = 'E';
            flipSprite(this.player, 'right');
            x = this.checkSpeed(speed, maxSpeed, x);
            y = this.checkSpeed(-speed, -maxSpeed, y);
        } else if (keyA)
        {
            this.player.animations.play('E');
            this.player.direction = 'W';
            flipSprite(this.player, 'left');
            x = this.checkSpeed(-speed, -maxSpeed, x);
            y = this.checkSpeed(speed, maxSpeed, y);
        } else
        {
            this.player.animations.stop();
            x = 0;
            y = 0;
        }

        this.player.body.velocity.x = x;
        this.player.body.velocity.y = y;
    }
    this.addItems = function (obj) {
        for (item in obj) {
            if (!player.materials[item]) {
                player.materials[item] = 0;
            }
            player.materials[item] += obj[item]
        }
    }
    this.checkSpeed = function (speed, max, target) {
        result = speed + target;
        if (result > max || result < max) {
            return max;
        }
        return result;
    }

}
