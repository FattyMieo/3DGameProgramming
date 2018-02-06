precision mediump float;
varying vec4 fColor;
varying vec2 fTexCoord;

uniform sampler2D sampler2d;
uniform float Time;

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
	resultColor.r = mod(0.1 * tan(combinedColor.r - Time), 1.0);
	resultColor.g = mod(0.1 * tan(combinedColor.g - Time), 1.0);
	resultColor.b = mod(0.1 * tan(combinedColor.b - Time), 1.0);
	resultColor.a = combinedColor.a;
	
	//Animated
	gl_FragColor = resultColor;
	
	//Static RGB
	//gl_FragColor = fColor;
}