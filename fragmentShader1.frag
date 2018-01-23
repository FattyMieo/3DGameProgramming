precision mediump float;

void main()
{
	/*
	float r = abs(cos(gl_FragCoord.x * 0.1));
	float g = abs(cos(gl_FragCoord.y * 0.1));
	float b = abs(sin(gl_FragCoord.x + gl_FragCoord.y));
	*/
	float r = (gl_FragCoord.x >= 400.0 ? 1.0 : 0.0); //Assuming screen is 800x600
	float g = (gl_FragCoord.x < 400.0 ? 1.0 : 0.0);
	float b = 0.0;

	gl_FragColor = vec4 ( r, g, b, 1.0 );
}
