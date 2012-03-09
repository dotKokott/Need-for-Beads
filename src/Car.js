function Car () {
    this.x = 7;
    this.y = 13;
    this.color = 0xFF0000;
    this.score = 0;
    this.alive = true;
};

Car.prototype.update = function() {
    this.score += 2;

    tickTime = 8 - parseInt(this.score / 400);
};

Car.prototype.handleKey = function(key) {	
	if(this.alive)
	{
		if(key == PS.ARROW_LEFT) 
		{		
			if(!checkCollisionWith(this.x -1, this.y, "wall"))
			{
				this.x--;		
			}	
			else
			{
				PS.AudioPlay("fx_bang");
			}	
		}
		if(key == PS.ARROW_RIGHT) 
		{
			if(!checkCollisionWith(this.x + 1, this.y, "wall"))
			{
				this.x++;
			}
			else
			{
				PS.AudioPlay("fx_bang");
			}
		}
		if(key == PS.ARROW_UP) this.y--;
		if(key == PS.ARROW_DOWN) this.y++;
	}
};

Car.prototype.draw = function() {
    PS.BeadColor(this.x, this.y, this.color);
    PS.BeadColor(this.x, this.y+1, this.color);  
    if(this.alive)  
    {
    	PS.StatusText("Your score: --" + this.score.toString() + "--");	
    }
    else
    {
    	PS.StatusText("Crash! Your score: " + this.score.toString() + "! PRESS RETURN");
    }
};