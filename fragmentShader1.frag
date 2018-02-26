precision mediump float;
varying vec4 fPosition;
varying vec4 fColor;
varying vec2 fTexCoord;

uniform sampler2D sampler2d;
uniform float Time;
uniform float Spectrum;

const float offsetX = 400.0;
const float offsetY = 300.0;
const float freq = 50.0;
const float amp = 50.0;
const float width = 40.0;
const float speed = 15.0;

//Heart
const float minSize = 50.0;
const float maxSize = 100.0;
const float curvature = 3.0;

//Linearly interpolate between two values
float lerp(float v0, float v1, float t)
{
	return ((1.0 - t) * v0) + (t * v1);
}

float invLerp(float v0, float v1, float v)
{
	return (v - v0) / (v1 - v0);
}

void main()
{
	vec4 texColor = texture2D(sampler2d, fTexCoord);
	vec4 resultColor;
	resultColor.a = 1.0;
	
	float equation = amp * sin((gl_FragCoord.x / freq) - (offsetX + Time * speed)) + offsetY;
	
	//float dSize = (maxSize - minSize) * abs(sin(Time * speed)) + minSize;
	float dSize = (maxSize - minSize) * sin(Spectrum * 10.0) + minSize;
	float hEq = pow((gl_FragCoord.x - offsetX) / dSize, 2.0) + pow(((gl_FragCoord.y - offsetY) / dSize) - sqrt(abs((gl_FragCoord.x - offsetX) / dSize)), 2.0);
	
	//if(gl_FragCoord.y >= equation - width && gl_FragCoord.y <= equation + width) //Sine Wave
	/*
	{
		resultColor.r = (1.0 - abs((invLerp(equation - width, equation + width, gl_FragCoord.y) - 0.5) * 2.0));
		resultColor.g = (1.0 - abs((invLerp(equation - width, equation + width, gl_FragCoord.y) - 0.5) * 2.0));
		resultColor.b = (1.0 - abs((invLerp(equation - width, equation + width, gl_FragCoord.y) - 0.5) * 2.0));
	}*/
	if(hEq <= curvature && hEq >= curvature / 2.0) //Heart Equation
	{
		resultColor.r = (1.0 - abs((invLerp(curvature / 2.0, curvature, hEq))));
		resultColor.g = (1.0 - abs((invLerp(curvature / 2.0, curvature, hEq))));
		resultColor.b = (1.0 - abs((invLerp(curvature / 2.0, curvature, hEq))));
	}
	else if(hEq < curvature / 2.0)
	{
		resultColor.r = 1.0;
		resultColor.g = 1.0;
		resultColor.b = 1.0;
	}
	else
	{
		resultColor.r = 0.0;
		resultColor.g = 0.0;
		resultColor.b = 0.0;
	}
	
	/*
	vec4 gradientColor;
	
	gradientColor.r = 0.5 * sin(gl_FragCoord.x / 125.0 + 0.0) + 0.5;
	gradientColor.g = 0.5 * sin(gl_FragCoord.x / 125.0 + 2.0) + 0.5;
	gradientColor.b = 0.5 * sin(gl_FragCoord.x / 125.0 + 4.0) + 0.5;
	gradientColor.a = 1.0;
	*/
		
	gl_FragColor = texColor + resultColor;
}