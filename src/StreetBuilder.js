function StreetBuilder(street) {
	this.street = street;
	this.streetBuffer = new Array();

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

StreetBuilder.prototype.getNextStreetPart = function() {
	if(this.streetBuffer.length == 0)
	{
		this.fillStraightStreet(15, this.lastX, this.lastWidth);
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
	if(originWidth == width) return;
	var realWidth = max(originWidth, width);

	for(var i = 1;i <= width; i++)
	{
		this.changeStreetWidth(realWidth - (2 * i), relX + i);
	}
};

StreetBuilder.prototype.stretchStreetWidth = function(width) {
	var relX, originWidth;
	if(this.streetBuffer.length > 0)
	{
		relX = this.streetBuffer[0].x;	
		originWidth = this.streetBuffer[0].width;
	}

	if(originWidth == width) return;
	var realWidth = min(originWidth, width);

	for(var i = 1;i <= realWidth; i++)
	{	
		this.changeStreetWidth(realWidth + (2 * i), relX - i);
	}
};

StreetBuilder.prototype.curveStreet = function(direction, amount, longCurve) {
	if(this.streetBuffer[0].width < 5) this.stretchStreetWidth(5);
	if(this.streetBuffer[0].width > 5) this.narrowStreetWidth(5);

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
		this.insertPart(oldPart.x + _modifier, 5);
	}
};

StreetBuilder.prototype.insertPart = function(x, width) {
	var part = new StreetPart(this.street, x, width);
	part.borderColor = this.getColor();
	this.streetBuffer.splice(0,0,part);
	
	this.lastX = part.x;
	this.lastWidth = part.width;
};