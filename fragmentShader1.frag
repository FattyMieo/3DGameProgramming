precision mediump float;
varying vec4 fColor;
varying vec2 fTexCoord;

uniform sampler2D sampler2d;
uniform float Time;

void main()
{
	//vec4 resultColor;
	
	//From RGB slowly turn into whites
	//resultColor.r = fColor.r + Time;
	//resultColor.g = fColor.g + Time;
	//resultColor.b = fColor.b + Time;
	
	//Interpolation
	//resultColor.r = mod(fColor.r + Time, 1.0);
	//resultColor.g = mod(fColor.g + Time, 1.0);
	//resultColor.b = mod(fColor.b + Time, 1.0);
	//resultColor.a = fColor.a;
	
	//Animated
	//gl_FragColor = resultColor;
	
	//Static RGB
	//gl_FragColor = fColor;
	
	//Use Texture Color only
	gl_FragColor = texture2D(sampler2d, fTexCoord);
}