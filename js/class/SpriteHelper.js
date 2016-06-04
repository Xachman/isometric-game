SpriteHelper = function () {
    this.checkDistance = function (item1, item2, distance) {
        if (
                item2.body.x < (item1.body.x + item1.width + distance) &&
                item2.body.x + item2.width > (item1.body.x - distance) &&
                item2.body.y < (item1.body.y + item1.height + distance) &&
                item2.body.y + item2.height > (item1.body.y - distance)
                )
            return item1;
    }
    return false;
}

