import sys

#from Adafruit_AMG88xx import *

#import logging
#sys.path.append("./home/pi/Adafruit_AMG88xx_python/examples")
from Adafruit_AMG88xx import Adafruit_AMG88xx


from time import sleep

sensor = Adafruit_AMG88xx()

sleep(.1)


# for i in range(1, 11): 
# 	s = sensor.readPixels()
# 	average = (s[28] + s[29] + s[36] + s[37])/4.0 + 4.0
# 	print(average)

while(1):
    s = sensor.readPixels()
    average = (s[28] + s[29] + s[36] + s[37])/4.0 + 4.0
    if(average > 35 and average < 40) : 
        #sleep(1)
        average = (s[28] + s[29] + s[36] + s[37])/4.0 + 4.0
        
        sys.stdout = open('/home/pi/Adafruit_AMG88xx_python/examples/temp.txt','w')
        print(average)
        sys.stdout.close()

		#sys.stdout.flush()
	#break	



