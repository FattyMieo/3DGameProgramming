precision mediump float;
varying vec4 fPosition;
varying vec4 fColor;
varying vec2 fTexCoord;

uniform sampler2D sampler2d;
uniform float Time;

const float offsetX = 0.0;
const float offsetY = 300.0;
const float freq = 25.0;
const float amp = 50.0;
const float width = 10.0;
const float speed = 10.0;

void main()
{
	vec4 resultColor;
	
	float equation1 = amp * sin((gl_FragCoord.x / freq) - (offsetX + Time * speed)) + offsetY - width;
	float equation2 = amp * sin((gl_FragCoord.x / freq) - (offsetX + Time * speed)) + offsetY + width;
	
	// y = asin(fx-dx) + c;
	if(gl_FragCoord.y >= equation1 && gl_FragCoord.y <= equation2)
	{
		resultColor.r = 1.0;
		resultColor.g = 1.0;
		resultColor.b = 1.0;
		resultColor.a = 1.0;
	}
	else
	{
		resultColor.r = 0.0;
		resultColor.g = 0.0;
		resultColor.b = 0.0;
		resultColor.a = 1.0;
	}
	
	gl_FragColor = resultColor;
}