class Stone {
    constructor(x , y, width, height, color, pointMultiplicator) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.margin = 1;
        this.x = x;
        this.y = y;
        this.hit = false;
        this.points = 5 * pointMultiplicator;
    }

    draw(context) {
        context.beginPath();
        context.rect(
            this.x, 
            this.y, 
            this.width, 
            this.height,
        );
        context.fillStyle = this.color;
        context.fill();
        context.closePath()
    }
}
