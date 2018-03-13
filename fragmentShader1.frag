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
	//vec4 resultColor = texColor;
	
	//resultColor = vec4(fTexCoord.x, fTexCoord.y, 0.0, 1.0);
	
	vec2 uvPerKernel = 1.0 / resolution;
	
	vec4 origColor = vec4(0.0);
	int total = 0;
	float halfKernelSize = float(kernelSize) / 2.0;
	
/*	float minX = fTexCoord.x - (halfKernelSize * uvPerKernel.x);
	if(minX < 0.0) minX = 0.0;
	float maxX = fTexCoord.x + (halfKernelSize * uvPerKernel.x);
	if(maxX > 1.0) maxX = 1.0;
	float minY = fTexCoord.y - (halfKernelSize * uvPerKernel.y);
	if(minY < 0.0) minY = 0.0;
	float maxY = fTexCoord.y + (halfKernelSize * uvPerKernel.y);
	if(maxY > 1.0) maxY = 1.0;
*/	
	float minX = fTexCoord.x - uvPerKernel.x;
	if(minX < 0.0) minX = 0.0;
	float maxX = fTexCoord.x + uvPerKernel.x;
	if(maxX > 1.0) maxX = 1.0;
	float minY = fTexCoord.y - uvPerKernel.y;
	if(minY < 0.0) minY = 0.0;
	float maxY = fTexCoord.y + uvPerKernel.y;
	if(maxY > 1.0) maxY = 1.0;
	
	//Loop very slow
	for(float i = minY; i <= maxY; i += uvPerKernel.y)
	{
		for(float j = minX; j <= maxX; j += uvPerKernel.x)
		{
			//vec2 a = vec2(0.0, 0.0);
			//origColor += texture2D(sampler2d, a);
			//origColor += texture2D(sampler2d, vec2(j, i));
			total++;
		}
	}
	
	origColor /= float(total);
	
	gl_FragColor = texColor;
}