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
	
	vec4 color0 = vec4(0.2, 0.2, 1.0, texColor.w);
	vec4 color1 = vec4(1.0, 0.2, 0.2, texColor.w);
	vec4 color2 = vec4(0.9, 0.8, 0.6, texColor.w);
	vec4 color3	= vec4(0.8, 0.8, 0.9, texColor.w);
	vec4 color4 = vec4(1.0, 1.0, 1.0, texColor.w);
	
	resultColor = vec4(avgColor, avgColor, avgColor, texColor.w);
	
	if(avgColor < 0.28)
		resultColor = color0;
	else if(avgColor < 0.42)
		resultColor = color1;
	else if(avgColor < 0.65)
		resultColor = color2;
	else if(avgColor < 0.845)
		resultColor = color3;
	else
		resultColor = color4;
	
	//resultColor = resultColor * resultColor;
	//resultColor *= texColor;
	
	gl_FragColor = resultColor;
}