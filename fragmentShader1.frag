precision mediump float;

float PI = 3.14159265359;

float degreeToRadian(float degree)
{
	return 180.0 / PI * degree;
}

void main()
{
	/*
	float r = abs(cos(gl_FragCoord.x * 0.1));
	float g = abs(cos(gl_FragCoord.y * 0.1));
	float b = abs(sin(gl_FragCoord.x + gl_FragCoord.y));
	
	gl_FragColor = vec4 ( r, g, b, 1.0 );
	*/
	
	/*
	if(gl_FragCoord.x >= 400.0) //Assuming screen is 800x600
		gl_FragColor = vec4 ( 1.0, 0.0, 0.0, 1.0 );
	else
		gl_FragColor = vec4 ( 0.0, 1.0, 0.0, 1.0 );
	*/
	
	float r = abs(sin(gl_FragCoord.x * 0.01 + degreeToRadian(0.0)));
	float g = abs(sin(gl_FragCoord.x * 0.01 + degreeToRadian(90.0)));
	float b = abs(sin(gl_FragCoord.x * 0.01 + degreeToRadian(180.0)));
	
	gl_FragColor = vec4 ( r, g, b, 1.0 );
}