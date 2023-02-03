class Stone {
    constructor(x , y, width, height) {
        this.width = width;
        this.height = height;
        this.color = "#FF0000";
        this.margin = 20;
        this.x = x;
        this.y = y;
        this.hit = false;
        this.points = 10;
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
