function Car () {
    this.x = 7;
    this.y = 13;
    this.color = 0xFF0000;
};

Car.prototype.update = function() {
    
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
};