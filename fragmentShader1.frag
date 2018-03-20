precision mediump float;
varying vec4 fPosition;
varying vec4 fColor;
varying vec2 fTexCoord;

uniform sampler2D sampler2d;
uniform float Time;

const vec2 resolution = vec2(800.0, 600.0);

//Box Blur
const int kernelSize = 6;

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
	vec2 uvPerKernel = 1.0 / resolution;
	
	vec4 resultColor = vec4(0.0);
	
	for(int i = -kernelSize; i <= kernelSize; i++)
	{
		for(int j = -kernelSize; j <= kernelSize; j++)
		{
			vec2 coord = vec2(fTexCoord.x + uvPerKernel.x * float(j), fTexCoord.y + uvPerKernel.y * float(i));
			resultColor += texture2D(sampler2d, coord);
		}
	}
	
	float total = float(kernelSize) * 2.0 + 1.0;
	total *= total;
	
	resultColor /= total;
	
	gl_FragColor = resultColor;
}