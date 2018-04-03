precision mediump float;
varying vec4 fPosition;
varying vec4 fColor;
varying vec2 fTexCoord;

uniform sampler2D sampler2d;
uniform int uBlurDirection;
uniform vec2 resolution;
uniform float Time;

vec2 uvPerKernel = 1.0 / resolution;

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
	
	if(uBlurDirection == 0) // Apply Horizontal Blur
	{
		vec4 resultColor = vec4(0.0);
		//int timedRadius = radius - int(floor(float(radius) * abs(sin(Time * speed)) + 0.5));
		
		float total = 0.0;
		
		for(float j = -radius; j <= radius; j+=jumpPixel)
		{
			float x = fTexCoord.x + uvPerKernel.x * float(j);
			if(x < 0.0 || x > 1.0) continue;
			
			float y = fTexCoord.y;
			
			//Don't have to check if pixel is out of circle since it's one dimensional
			//if(useGaussianBlur)
			//	if(j * j > radius * radius) continue;
			
			vec4 pixelColor = texture2D(sampler2d, vec2(x, y));
			
			float weight = 1.0;
			
			if(useGaussianBlur)
				weight = gaussianFunction(j / radius);
			
			pixelColor *= weight;
			
			resultColor += pixelColor;
			
			total += weight; //Add weight to total instead of using 1.0
		}
		
		resultColor /= float(total);
		
		gl_FragColor = resultColor;
	}
	else if(uBlurDirection == 1) // Apply Vertical Blur
	{
		vec4 resultColor = vec4(0.0);
		//int timedRadius = radius - int(floor(float(radius) * abs(sin(Time * speed)) + 0.5));
		
		float total = 0.0;
		
		for(float i = -radius; i <= radius; i+=jumpPixel)
		{
			float y = fTexCoord.y + uvPerKernel.y * float(i);
			if(y < 0.0 || y > 1.0) continue;
			
			float x = fTexCoord.x;
				
			//Don't have to check if pixel is out of circle since it's one dimensional
			//if(useGaussianBlur)
			//	if(i * i > radius * radius) continue;
			
			vec4 pixelColor = texture2D(sampler2d, vec2(x, y));
			
			float weight = 1.0;
			
			if(useGaussianBlur)
				weight = gaussianFunction(i / radius);
			
			pixelColor *= weight;
			
			resultColor += pixelColor;
			
			total += weight; //Add weight to total instead of using 1.0
		}
		
		resultColor /= float(total);
		
		gl_FragColor = resultColor;
	}
	else //Don't apply Blur
	{
		gl_FragColor = texColor;
	}
}