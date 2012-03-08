function Car () {
    this.x = 7;
    this.y = 13;
    this.color = 0xFF0000;
    this.score = 0;
};

Car.prototype.update = function() {
    this.score += 2;

    tickTime = 10 - parseInt(this.score / 400);
};

Car.prototype.handleKey = function(key) {	
	if(key == PS.ARROW_LEFT) 
	{		
		if(!checkCollisionWith(this.x -1, this.y, "wall"))
		{
			this.x--;	
		}		
	}
	if(key == PS.ARROW_RIGHT) 
	{
		if(!checkCollisionWith(this.x + 1, this.y, "wall"))
		{
			this.x++;
		}
	}
	if(key == PS.ARROW_UP) this.y--;
	if(key == PS.ARROW_DOWN) this.y++;
};

Car.prototype.draw = function() {
    PS.BeadColor(this.x, this.y, this.color);
    PS.BeadColor(this.x, this.y+1, this.color);    
    PS.StatusText("Your score: --" + this.score.toString() + "--");
};