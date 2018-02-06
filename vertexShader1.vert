attribute vec4 vPosition;
attribute vec4 vColor; //Get from CPU
attribute vec2 vTexCoord; //Get from CPU

varying vec4 fColor; //Pass to fragment shaders
varying vec2 fTexCoord; //Pass to fragment shaders

void main()
{
	fColor = vColor;
	fTexCoord = vTexCoord;
	
	gl_Position = vPosition;
}
