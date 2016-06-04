DisplayHelper = function (char) {
    this.x = char.x - char.width / 2;
    this.y = char.y - char.height / 2;
    this.char = char;

    this.contains = function (x, y) {
        var child = this.char;
        if (
                x < (this.x + child.width) &&
                x > this.x &&
                y < (this.y + child.height) &&
                y > (this.y)
                ) {
            console.log('ture');
            return true;
        }
        return false;
    }
}
