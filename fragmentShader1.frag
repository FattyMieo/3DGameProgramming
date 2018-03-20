precision mediump float;
varying vec4 fPosition;
varying vec4 fColor;
varying vec2 fTexCoord;

uniform sampler2D sampler2d;
uniform float Time;

const vec2 resolution = vec2(800.0, 600.0);
const vec2 uvPerKernel = 1.0 / resolution;

//Box Blur
const float radius = 50.0;
const float jumpPixel = 1.0;
//const float speed = 5.0;

//Gaussian Blur
const float variance = 0.15; // x & y should be -1.0 to 1.0 with this variance
const bool useGaussianBlur = true;

float gaussianFunction(float x)
{
	float alpha = - (x * x / (2.0 * variance));
	
	return exp(alpha);
}

float gaussianFunction2D(float x, float y) //x & y represents the "UV" distance from the origin
{
	float alpha = - ((x * x + y * y) / (2.0 * variance));
	
	return exp(alpha);
}

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
	
	vec4 resultColor = vec4(0.0);
	//int timedRadius = radius - int(floor(float(radius) * abs(sin(Time * speed)) + 0.5));
	
	int total = 0;
	for(float i = -radius; i <= radius; i+=jumpPixel)
	{
		float y = fTexCoord.y + uvPerKernel.y * float(i);
		if(y < 0.0 || y > 1.0) continue;
		
		for(float j = -radius; j <= radius; j+=jumpPixel)
		{
			float x = fTexCoord.x + uvPerKernel.x * float(j);
			if(x < 0.0 || x > 1.0) continue;
			
			vec4 pixelColor = texture2D(sampler2d, vec2(x, y));
			
			if(useGaussianBlur)
				pixelColor *= gaussianFunction2D(uvPerKernel.x * float(j), uvPerKernel.y * float(i));
			
			resultColor += pixelColor;
			
			total++;
		}
	}
	
	resultColor /= float(total);
	
	gl_FragColor = resultColor;
}