function Street () {
    this.x = 7;
    this.y = 15;
    this.borderColor = 0x35322D;
    this.borderLightColor = 0x000000;
    this.innerColor = 0x646360;

    this.builder = new StreetBuilder(this);

    this.streetData = new Array();
    this.builder.fillStraightStreet(15,5,5);
};

Street.prototype.update = function() {
	var nextStreetPart = this.builder.getNextStreetPart();
    if(typeof nextStreetPart == "undefined") alert("lol");

    this.streetData.splice(0,0, nextStreetPart);
	if(this.streetData.length > 16) this.streetData.pop(); //Bild voll

	var startY = 15;
	for(var i = this.streetData.length -1; i>= 0;i--)
	{
        if(typeof this.streetData[i] == "undefined")
        {
            alert(i + " " + this.streetData.length);
        }
		this.streetData[i].y = startY;
		startY -= 1;
	}

    if(checkCollisionWith(car.x,car.y, "wall") || checkCollisionWith(car.x, car.y, "obstacle")) 
	{	
        car.alive = false;
        PS.AudioPlay("fx_bomb2");        
        gameRunning = false;
	}
};

Street.prototype.draw = function() {
    for(var i = this.streetData.length -1;i >= 0;i--)
    {
    	this.streetData[i].draw();
    } 
};