Actions = function () {
    this.spriteHelper = new SpriteHelper();
    this.hitAction = function(target, player) {
        if(typeof target == 'undefined') return;
        targetCheck = this.spriteHelper.checkDistance(target, player, 5);
        if (targetCheck) {
            target.hits -= 1;
            if (target.hits <= 0) {
                playerHelper.addItems(target.gives);
                target.kill();
            }
        }
    }
    
}
