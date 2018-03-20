precision mediump float;
varying vec4 fPosition;
varying vec4 fColor;
varying vec2 fTexCoord;

uniform sampler2D sampler2d;
uniform float Time;

const vec2 resolution = vec2(800.0, 600.0);

//Box Blur
const int radius = 50;
//const float speed = 5.0;

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
	//int timedRadius = radius - int(floor(float(radius) * abs(sin(Time * speed)) + 0.5));
	
	int total = 0;
	for(int i = -radius; i <= radius; i++)
	{
		for(int j = -radius; j <= radius; j++)
		{
			float x = fTexCoord.x + uvPerKernel.x * float(j);
			if(x < 0.0 || x > 1.0) continue;
			float y = fTexCoord.y + uvPerKernel.y * float(i);
			if(y < 0.0 || y > 1.0) continue;
			
			resultColor += texture2D(sampler2d, vec2(x, y));
			total++;
		}
	}
	
	resultColor /= float(total);
	
	gl_FragColor = resultColor;
}