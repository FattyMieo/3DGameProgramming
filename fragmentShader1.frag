precision mediump float;
varying vec4 fPosition;
varying vec4 fColor;
varying vec2 fTexCoord;

uniform sampler2D sampler2d;
uniform float Time;

const vec2 resolution = vec2(800.0, 600.0);

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
	vec4 resultColor = texColor;
	
	float avgColor = (texColor.x + texColor.y + texColor.z) / 3.0;
	
	float power = 64.0;
	float div = 256.0 / power;
	
	resultColor = floor(resultColor * div) / div;
	avgColor = (resultColor.x + resultColor.y + resultColor.z) / 3.0;
	resultColor = vec4(avgColor, avgColor, avgColor, texColor.w) * 2.0;
	
	vec4 color0 = vec4(0.2, 0.3, 1.0, texColor.w);
	vec4 color1 = vec4(1.0, 0.2, 0.2, texColor.w);
	vec4 color2 = vec4(0.9, 0.8, 0.6, texColor.w);
	vec4 color3	= vec4(0.8, 0.8, 0.9, texColor.w);
	vec4 color4 = vec4(1.0, 1.0, 1.0, texColor.w);
	
	if(avgColor < 0.1)
		resultColor = color0;
	else if(avgColor < 0.3)
		resultColor = color1;
	else if(avgColor < 0.4)
		resultColor = color2;
	else if(avgColor < 0.5)
		resultColor = color3;
	else
		resultColor = color4;
	
	resultColor *= texColor;
	resultColor *= 2.0;
	
	gl_FragColor = resultColor;
}