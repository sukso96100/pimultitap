import logging
import sys
import time

import daemonocle
from peewee import *
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

    print ("Setting GPIO Mode as BCM")
    GPIO.setmode(GPIO.BCM)

    print ("Setting Up GPIO from 2 to 9")
    for i in range(2, 10):
    GPIO.setup(i, GPIO.OUT)
    
    while True:
        db = SqliteDatabase('config.db', threadlocals=True)

        class Configs(Model):
            num = IntegerField()
            name = CharField()
            state = BooleanField()

            class Meta:
                database = db

        for item in Configs.select():
            print(item.name)
            GPIO.output(item.num+2,item.state)

if __name__ == '__main__':
    daemon = daemonocle.Daemon(
        worker=main,
        shutdown_callback=cb_shutdown,
        pidfile='/var/run/daemonocle_example.pid',
    )
    daemon.do_action(sys.argv[1])
