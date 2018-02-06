precision mediump float;
uniform float Time;

const float PI = 3.14159265359;

const float f = 40.0; //Frequency, Be Power of 2

const float p = 1.625; //Highest point in y
const float c = 6.0; //Degree of interception, 1 / k"Height"

const float a = (c + 2.0) * p / (2.0 * c);
const float k = (c - 2.0) * p / (2.0 * c);

const float offsetX = 0.0;
const float h = (2.0 * PI / 3.0);

float getRainbowEquation(float colorOffset, float x, float time)
{
	float y = (a * cos((x / f) - (h * colorOffset) + offsetX)) + k;
	
	if(y > 1.0) return 1.0;
	else if(y < 0.0) return 0.0;
	else return y;
}

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
	
	//First Attempt
	/*
	float r = abs(sin(gl_FragCoord.x * 0.01 + degreeToRadian(0.0)));
	float g = abs(sin(gl_FragCoord.x * 0.01 + degreeToRadian(90.0)));
	float b = abs(sin(gl_FragCoord.x * 0.01 + degreeToRadian(180.0)));
	*/
	
	//Second Attempt: Using new sine equation formula (continuous r g b value rise and drop)
	float r = getRainbowEquation(0.0, gl_FragCoord.y + Time * 50.0, Time);
	float g = getRainbowEquation(1.0, sqrt(gl_FragCoord.x * gl_FragCoord.x + gl_FragCoord.y * gl_FragCoord.y) + -Time * 50.0, Time);
	float b = getRainbowEquation(2.0, sqrt(gl_FragCoord.x * gl_FragCoord.x - gl_FragCoord.y * gl_FragCoord.y) + Time * 50.0, Time);
	
	gl_FragColor = vec4 ( r, g, b, 1.0 );
}