class Stone {
    constructor(x , y, context) {
        this.width = context.width * 0.15;
        this.height = context.height * 0.025;
        this.color = "#FF0000";
        this.margin = 20;
        this.x = x;
        this.y = y;
        this.hit = false;
        this.points = 10;
    }
    //Stein malen
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
        //Kollision erkennen (muss noch auf die größe des Bals angepasst werden)
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
