class Stone {
    constructor(x , y) {
        this.width = 200;
        this.height = 20;
        this.color = "#FF0000";
        this.margin = 20;
        this.x = x;
        this.y = y;
        this.hit = false;
        this.points = 10;
    }
    draw(context) {
        if(!this.hit) {
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
        else { }
    }
    //ToDo: Kollisionserkennung verbessern dass die Steine richtig erkannt werden
    isHit(x, y) {
        if(((x+10 || x-10) > this.x && (x+10 || x-10) < (this.x + this.width)) && ((y +10 || y-10) > this.y && (y+10 || y-10) < (this.y + this.height))) {
            this.hit = true;
            return true;
        }
        else {
            return false;
        }
    }
    delete() {
        
    }
}
