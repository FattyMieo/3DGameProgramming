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
	
	float avgColor = (texColor.x + texColor.y + texColor.z) / 3.0;
	
	float halfWidth = resolution.x / 2.0;
	float halfHeight = resolution.y / 2.0;
	
	float maxRadiusSqr = ((halfWidth * halfWidth) + (halfHeight * halfHeight));
	float radiusSqr =
	(gl_FragCoord.x - halfWidth) * (gl_FragCoord.x - halfWidth) +
	(gl_FragCoord.y - halfHeight) * (gl_FragCoord.y - halfHeight);
	
	float radiusScale = abs(sin(Time) * sin(Time) * sin(Time));
	
	vec4 resultColor = texColor;
	if(radiusSqr <= maxRadiusSqr * radiusScale)
	{
		resultColor = mix(texColor, vec4(avgColor, avgColor, avgColor, texColor.w), radiusSqr / (maxRadiusSqr * radiusScale)); //Smoother Edge
	}
	else
	{
		resultColor = vec4(avgColor, avgColor, avgColor, texColor.w);
	}
	
	gl_FragColor = resultColor;
}