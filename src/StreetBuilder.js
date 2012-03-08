function StreetBuilder(street) {
	this.street = street;
	this.streetBuffer = new Array();
	
	this.possibleSections = new Array();
	this.possibleSections.push("curve","straight", "curve");

	this.colorSwitch = false; //switches color for the whole StreetBuilder to ensure alternating border colors
	this.lastX = 5;
	this.lastWidth = 5;
};

StreetBuilder.prototype.getColor = function() {
	var color = this.street.borderColor;
	if(this.colorSwitch) color = this.street.borderLightColor;
	this.colorSwitch = !this.colorSwitch;
	
	return color;
};

StreetBuilder.prototype.generateRandomSection = function() {
	var randomSectionIndex = randomToN(this.possibleSections.length);
	var randomSection = this.possibleSections[randomSectionIndex -1];

	switch (randomSection) {
  		case "straight":
    		this.fillStraightStreet(randomToN(20), this.lastX, this.lastWidth);
    		break;
  		case "curve":
  			var direction = "left";
  			if(randomToN(1)) direction = "right";

  			var longCurve = false;
  			if(randomToN(1)) longCurve = true;
  			this.curveStreet(direction, randomToN(6),longCurve);	
    		break;
    	case "narrow":    	
    		this.narrowStreetWidth(randomToN(4));
    		break;
    	case "stretch":
    		this.stretchStreetWidth(randomToN(5));
    		break;
    	default:
    		this.fillStraightStreet(randomToN(10), this.lastX, this.lastWidth);
    		break;
    }
};

StreetBuilder.prototype.getNextStreetPart = function() {
	if(this.streetBuffer.length <= 5)
	{
		this.generateRandomSection();		
	}
	return this.streetBuffer.pop();
};

StreetBuilder.prototype.fillStraightStreet = function(length, x, width) {	
	for(var i = 0; i < length; i++)
	{
		this.insertPart(x, width);
	}
};

StreetBuilder.prototype.changeStreetWidth = function(width, newX) {
	this.insertPart(newX, width);
};

StreetBuilder.prototype.narrowStreetWidth = function(width) {
	var relX, originWidth;
	if(this.streetBuffer.length > 0)
	{
		relX = this.streetBuffer[0].x;	
		originWidth = this.streetBuffer[0].width;
	}
	if(originWidth <= width) return;
	var reduceAmount = originWidth - width;

	for(var i = 1;i <= reduceAmount; i++)
	{
		if(originWidth - i >= 3) this.changeStreetWidth(originWidth - i, relX + i);		
	}
};

StreetBuilder.prototype.stretchStreetWidth = function(width) {
	var relX, originWidth;
	if(this.streetBuffer.length > 0)
	{
		relX = this.streetBuffer[0].x;	
		originWidth = this.streetBuffer[0].width;
	}

	if(originWidth >= width) return;
	var increaseAmount = width - originWidth;

	for(var i = 1;i <= increaseAmount; i++)
	{	
		var rightBorder = originWidth + (2 * i) + relX - i;
		if(relX - i >= 0 && rightBorder < 16) this.changeStreetWidth(originWidth + (2 * i), relX - i);			
	}
};

StreetBuilder.prototype.curveStreet = function(direction, amount, longCurve) {
	if(this.streetBuffer[0])
	{
		if(this.streetBuffer[0].width < 5) this.stretchStreetWidth(5);
		if(this.streetBuffer[0].width > 5) this.narrowStreetWidth(5);		
	}

	var modifier;
	if(direction == "right") modifier = 1;
	if(direction == "left") modifier = -1;

	if(longCurve) amount *= 2;

	for(var i = 1;i <= amount;i++)
	{
		var _modifier = modifier;
		if(longCurve)
		{				
			if(i % 2 == 0)
			{
				_modifier = 0;
			}
		}

		var oldPart = this.streetBuffer[0];
		var startX = car.x;
		if(oldPart)
		{
			startX = oldPart.x;
		}

		if(((startX + _modifier + 6) > 15) || startX + _modifier < 0)
		{
			_modifier = 0;
		}

		this.insertPart(startX + _modifier, 5);			
	}
};

StreetBuilder.prototype.insertPart = function(x, width) {
	var part = new StreetPart(this.street, x, width);

	part.borderColor = this.getColor();
	this.streetBuffer.splice(0,0,part);
	
	var obstacleChance = randomToN(100);
	var obstacleCount = 0;
	if(obstacleChance > 98) obstacleCount = 2;
	if(obstacleChance > 95 && obstacleChance < 98) obstacleCount = 1;
	for(var i = 0; i < obstacleCount;i++)
	{
		part.obstacles.push(new Obstacle(part, part.x + randomToN(part.width)));
	}

	this.lastX = part.x;
	this.lastWidth = part.width;
};