import logging
import sys
import time

import daemonocle
import sqlite3
import RPi.GPIO as GPIO

def cb_shutdown(message, code):
    logging.info('Daemon is stopping')
    logging.debug(message)
    GPIO.cleanup()

def main():
    logging.basicConfig(
        filename='/var/log/control-daemon.log',
        level=logging.DEBUG, format='%(asctime)s [%(levelname)s] %(message)s',
    )
    logging.info('Daemon is starting')
    #Switch Contorl
    logging.debug('Still running')
    #DB Setup


    #RPi GPIO Setup

    logging.debug ("Setting GPIO Mode as BCM")
    GPIO.setmode(GPIO.BCM)

    logging.debug ("Setting Up GPIO from 2 to 9")
    for i in range(2, 10):
        GPIO.setup(i, GPIO.OUT)

    while True:
        db = sqlite3.connect('config.db')
        cursor = db.cursor()
        logging.debug("querying db")
        cursor.execute('SELECT * FROM config ORDER BY NUM')
        mydata = cursor.fetchall()
        logging.debug (mydata)

        for item in mydata:
            logging.debug(item[1])
            GPIO.output(item[0]+2,item[2])

if __name__ == '__main__':
    daemon = daemonocle.Daemon(
        worker=main,
        shutdown_callback=cb_shutdown,
        pidfile='/var/run/daemonocle_example.pid',
    )
    daemon.do_action(sys.argv[1])
