var Targeter = function(drawObj, targetables) {
    this.draw           = drawObj;
    this.targetables    = targetables;

}

Targeter.prototype.targetOnClick = function () {
    if (!game.input.activePointer.leftButton.isDown)
        return;
    this.draw.clear();
    var x = game.input.mousePointer.x + game.camera.x;
    var y = game.input.mousePointer.y + game.camera.y;
    for (var i = 0; i < this.targetables.length; i++) {
        var child = this.targetables[i];
        var displayHelper = new DisplayHelper(child);
        if (displayHelper.contains(x, y) && child.visible) {
            target = child;

            this.draw.lineStyle(8, 0xffd900);
            var ellipseWidth = child.width * .65;
            var ellipseHeight = child.width * .4;
            this.draw.drawEllipse(child.x, child.y+ child.height / 2- ellipseHeight / 2, ellipseWidth, ellipseHeight);
            return;
        }
    }
}