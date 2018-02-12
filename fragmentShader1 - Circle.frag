precision mediump float;
varying vec4 fPosition;
varying vec4 fColor;
varying vec2 fTexCoord;

uniform sampler2D sampler2d;
uniform float Time;

float r = 20.0;

void main()
{
	vec4 texColor = texture2D(sampler2d, fTexCoord);
	vec4 combinedColor;
	
	combinedColor = texColor; //Using texture color only (without vertex color) 
	//combinedColor = fColor * texColor;
	
	vec4 resultColor;
	
	//From RGB slowly turn into whites
	//resultColor.r = combinedColor.r + Time;
	//resultColor.g = combinedColor.g + Time;
	//resultColor.b = combinedColor.b + Time;
	
	//Interpolationd
	//resultColor.r = mod(0.1 * tan(combinedColor.r - Time), 1.0);
	//resultColor.g = mod(0.1 * tan(combinedColor.g - Time), 1.0);
	//resultColor.b = mod(0.1 * tan(combinedColor.b - Time), 1.0);
	
	float ax = pow((gl_FragCoord.x - 400.0), 2.0);
	float ay = pow((gl_FragCoord.y - 300.0), 2.0);
	float a = ax + ay;
	float b = r * r;
	
	if(a <= b)
	{
		resultColor.r = 1.0;
		resultColor.g = 1.0;
		resultColor.b = 1.0;
		resultColor.a = 1.0;
	}
	else
	{
		resultColor.r = 0.0;
		resultColor.g = 0.0;
		resultColor.b = 0.0;
		resultColor.a = 1.0;
	}
	
	//resultColor.r = 1.0 - abs(fPosition.x) + 1.0 - abs(fPosition.y);
	//resultColor.g = 1.0 - abs(fPosition.x) + 1.0 - abs(fPosition.y);
	//resultColor.b = 1.0 - abs(fPosition.x) + 1.0 - abs(fPosition.y);
	//resultColor.a = 1.0;
	
	//Animated
	gl_FragColor = resultColor;
	
	//Static RGB
	//gl_FragColor = fColor;
	
	
}