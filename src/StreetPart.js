function StreetPart(street,x,width) {
	this.street = street;	
	this.width = width;
	this.x = x;
	this.y = 0;
	this.borderColor = street.borderColor;
	this.obstacles = new Array();
};

StreetPart.prototype.draw = function() {	
	PS.BeadColor(this.x, this.y, this.borderColor);		
	for (var i=this.x + 1;i<this.width + this.x;i++)
	{
		PS.BeadColor(i, this.y, street.innerColor);
	}
	PS.BeadColor(this.x + this.width, this.y, this.borderColor);
	for(var i = 0; i < this.obstacles.length;i++)
	{
		PS.BeadColor(this.obstacles[i].x, this.y, this.obstacles[i].color);
	}
};