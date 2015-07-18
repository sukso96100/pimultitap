import sqlite3
import logging
# This is your daemon. It sleeps, and then sleeps again.
logging.basicConfig(
    filename='controler.log',
    level=logging.DEBUG, format='%(asctime)s [%(levelname)s] %(message)s',
)
while True:
    logging.debug("querying...")
    db = sqlite3.connect('config.db')
    cursor = db.cursor()
    cursor.execute('SELECT * FROM config ORDER BY NUM')
    mydata = cursor.fetchall()

    for item in mydata:
        print(item)
        logging.debug(item)
        GPIO.output(item[0]+2,item[2])
