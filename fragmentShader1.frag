precision mediump float;
varying vec4 fPosition;
varying vec4 fColor;
varying vec2 fTexCoord;

uniform sampler2D sampler2d;
uniform float Time;

const vec2 resolution = vec2(800.0, 800.0);

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
	
	float avgColor = (texColor.x + texColor.y + texColor.z) / 3.0;
	
	vec4 resultColor = vec4(avgColor, avgColor, avgColor, texColor.w);
	
	gl_FragColor = resultColor;
}