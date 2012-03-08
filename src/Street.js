function Street () {
    this.x = 7;
    this.y = 15;
    this.borderColor = 0x35322D;
    this.borderLightColor = 0x000000;
    this.innerColor = 0x646360;

    this.builder = new StreetBuilder(this);

    this.streetData = new Array();
    this.builder.fillStraightStreet(15,5,5);
    this.builder.curveStreet("right", 4);
    this.builder.curveStreet("left", 4);
};

Street.prototype.update = function() {
	this.streetData.splice(0,0, this.builder.getNextStreetPart());
	if(this.streetData.length > 16) this.streetData.pop(); //Bild voll

	var startY = 15;
	for(var i = this.streetData.length -1; i>= 0;i--)
	{
		this.streetData[i].y = startY;
		startY -= 1;
	}

    if(checkCollisionWith(car.x,car.y, "wall")) alert("Unfall");
};

Street.prototype.draw = function() {
    for(var i = this.streetData.length -1;i >= 0;i--)
    {
    	this.streetData[i].draw();
    } 
};