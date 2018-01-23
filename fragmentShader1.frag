precision mediump float;

void main()
{
	float r = abs(cos(gl_FragCoord.x * 0.1));
	float g = abs(cos(gl_FragCoord.y * 0.1));
	float b = abs(sin(gl_FragCoord.x + gl_FragCoord.y));

	gl_FragColor = vec4 ( r, g, b, 1.0 );
}
