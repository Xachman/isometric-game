Actions = function () {
    this.spriteHelper = new SpriteHelper();
    this.hitAction = function(target, player) {
        targetCheck = this.spriteHelper.checkDistance(target, player, 5);
        if (target) {
            target.hits -= 1;
            if (target.hits <= 0) {
                addItems(target.gives);
                target.kill();
            }
        }
    }
    
}
