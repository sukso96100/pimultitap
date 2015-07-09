import logging
import sys
import time

import daemonocle
from pymongo import MongoClient
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
    client = MongoClient('mongodb://localhost/')
    #RPi GPIO Setup

    print ("Setting GPIO Mode as BCM")
    GPIO.setmode(GPIO.BCM)

    print ("Setting Up GPIO from 2 to 9")
    GPIO.setup(2, GPIO.OUT)
    GPIO.setup(3, GPIO.OUT)
    GPIO.setup(4, GPIO.OUT)
    GPIO.setup(5, GPIO.OUT)
    GPIO.setup(6, GPIO.OUT)
    GPIO.setup(7, GPIO.OUT)
    GPIO.setup(8, GPIO.OUT)
    GPIO.setup(9, GPIO.OUT)
    while True:
        db = client.relayswitch
        collection = db.switchesconfigs
        for item in collection.find():
            logging.debug('Controling Switch')
            logging.info(item)
            print(item)
            GPIO.output(item.num,item.state)

if __name__ == '__main__':
    daemon = daemonocle.Daemon(
        worker=main,
        shutdown_callback=cb_shutdown,
        pidfile='/var/run/daemonocle_example.pid',
    )
    daemon.do_action(sys.argv[1])
