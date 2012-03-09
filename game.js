// game.js for Perlenspiel 2.1

/*
Perlenspiel is Copyright © 2009-12 Worcester Polytechnic Institute.
This file is part of Perlenspiel.

Perlenspiel is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Perlenspiel is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You may have received a copy of the GNU Lesser General Public License
along with Perlenspiel. If not, see <http://www.gnu.org/licenses/>.
*/

/*global PS */

var car;
var street;
var gameRunning = false;

function max(num1, num2) {
	if(num1>num2) return num1;
	return num2;
}
function min(num1, num2) {
	if(num1>num2) return num2;
	return num1;
}

function randomToN(maxVal)
{
   var randVal = Math.random()*maxVal;
   return Math.round(randVal);
};

function checkCollisionWith(x,y, collisionObjectName) {
	if(collisionObjectName == "wall") return checkCollisionWithWall(x,y, street);
	if(collisionObjectName == "obstacle") return checkCollisionWithObstacle(x,y, street);
	//if(collisionObjectName == "street") return checkCollisionWithStreet(x,y,street);
};

function checkCollisionWithWall(x,y, obj) {
	if(y < obj.streetData.length)
	{
		return (obj.streetData[y].x == x) || (obj.streetData[y].x +obj.streetData[y].width == x);	
	}
	return false;	
};

function checkCollisionWithObstacle(x,y, obj) {
	if(y < obj.streetData.length)
	{
		for(var i = 0; i < obj.streetData[y].obstacles.length;i++)
		{
			var obstacle = obj.streetData[y].obstacles[i];
			if(x == obstacle.x) return true;
		}		
	}
	return false;	
};

PS.Init = function ()
{
	"use strict";
	// change to the dimensions you want
	PS.StatusFade(false);
	PS.GridSize (16, 16); 
	PS.GridBGColor(0xC79236);
	PS.BeadFlash(PS.ALL, PS.ALL, false);
	PS.BeadBorderWidth (PS.ALL, PS.ALL, 0);

	PS.AudioLoad("fx_bang");
	PS.AudioLoad("fx_bomb2");

	car = new Car();
	street = new Street();
	gameRunning = true;
    PS.Clock(1);
};

// PS.Click (x, y, data)
// This function is called whenever a bead is clicked
// It doesn't have to do anything
// x = the x-position of the bead on the grid
// y = the y-position of the bead on the grid
// data = the data value associated with this bead, 0 if none has been set

PS.Click = function (x, y, data)
{
	"use strict";
	
	// put code here for bead clicks
};

// PS.Release (x, y, data)
// This function is called whenever a mouse button is released over a bead
// It doesn't have to do anything
// x = the x-position of the bead on the grid
// y = the y-position of the bead on the grid
// data = the data value associated with this bead, 0 if none has been set

PS.Release = function (x, y, data)
{
	"use strict";

	// Put code here for when the mouse button is released over a bead	
};

// PS.Enter (x, y, button, data)
// This function is called whenever the mouse moves over a bead
// It doesn't have to do anything
// x = the x-position of the bead on the grid
// y = the y-position of the bead on the grid
// data = the data value associated with this bead, 0 if none has been set

PS.Enter = function (x, y, data)
{
	"use strict";

	// Put code here for when the mouse enters a bead	
};

// PS.Leave (x, y, data)
// This function is called whenever the mouse moves away from a bead
// It doesn't have to do anything
// x = the x-position of the bead on the grid
// y = the y-position of the bead on the grid
// data = the data value associated with this bead, 0 if none has been set

PS.Leave = function (x, y, data)
{
	"use strict";

	// Put code here for when the mouse leaves a bead	
};

// PS.KeyDown (key, shift, ctrl)
// This function is called whenever a key on the keyboard is pressed
// It doesn't have to do anything
// key = the ASCII code of the pressed key, or one of the following constants:
// Arrow keys = PS.ARROW_UP, PS.ARROW_DOWN, PS.ARROW_LEFT, PS.ARROW_RIGHT
// Function keys = PS.F1 through PS.F1
// shift = true if shift key is held down, false otherwise
// ctrl = true if control key is held down, false otherwise

PS.KeyDown = function (key, shift, ctrl)
{
	"use strict";
	if(!gameRunning && key == 13)
	{
		PS.Init();		
	}
	car.handleKey(key);
	// Put code here for when a key is pressed	
};

// PS.KeyUp (key, shift, ctrl)
// This function is called whenever a key on the keyboard is released
// It doesn't have to do anything
// key = the ASCII code of the pressed key, or one of the following constants:
// Arrow keys = PS.ARROW_UP, PS.ARROW_DOWN, PS.ARROW_LEFT, PS.ARROW_RIGHT
// Function keys = PS.F1 through PS.F12
// shift = true if shift key is held down, false otherwise
// ctrl = true if control key is held down, false otherwise

PS.KeyUp = function (key, shift, ctrl)
{
	"use strict";
	
	// Put code here for when a key is released	
};

// PS.Wheel (dir)
// This function is called whenever the mouse wheel moves forward or backward
// It doesn't have to do anything
// dir = 1 if mouse wheel moves forward, -1 if backward

PS.Wheel = function (dir)
{
	"use strict";

	// Put code here for when a key is pressed	
};

// PS.Tick ()
// This function is called on every clock tick
// if a timer has been activated with a call to PS.Timer()
// It doesn't have to do anything

var tickTime = 10;
var tickCount = 0;
PS.Tick = function ()
{	
	"use strict";
	if(tickCount >= tickTime)
	{
		if(gameRunning)
		{
			PS.BeadColor(PS.ALL, PS.ALL, 0xC79236);
			car.update();    
			street.update();
			street.draw();
			car.draw();
		}		
		tickCount = 0;
	}
	else
	{
		tickCount++;
	}

};
