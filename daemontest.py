import sqlite3
import logging
import sys
import time

import daemonocle

def cb_shutdown(message, code):
    logging.info('Daemon is stopping')
    logging.debug(message)
    # cursor.close()
    
db = sqlite3.connect('config.db')
cursor = db.cursor()
def main():

    logging.basicConfig(
        filename='dbtest.log',
        level=logging.DEBUG, format='%(asctime)s [%(levelname)s] %(message)s',
    )
    logging.info('Daemon is starting')
    while True:

        logging.debug('Still running')
        cursor.execute('SELECT * FROM config ORDER BY NUM')
        mydata = cursor.fetchall()

        for item in mydata:
            print(item)
            logging.debug(item)
            # GPIO.output(item[0]+2,item[2])

if __name__ == '__main__':
    daemon = daemonocle.Daemon(
        worker=main,
        shutdown_callback=cb_shutdown,
        pidfile='/var/run/daemonocle_example.pid',
    )
    daemon.do_action(sys.argv[1])
