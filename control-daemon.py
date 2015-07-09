import logging
import sys
import time

import daemonocle
from pymongo import MongoClient

def cb_shutdown(message, code):
    logging.info('Daemon is stopping')
    logging.debug(message)

def main():
    logging.basicConfig(
        filename='/var/log/control-daemon.log',
        level=logging.DEBUG, format='%(asctime)s [%(levelname)s] %(message)s',
    )
    logging.info('Daemon is starting')
    #Switch Contorl
    logging.debug('Still running')
    client = MongoClient('mongodb://localhost:27017/')
    while True:
        db = client.relayswitch
        collection = db.switchesconfigs
        for item in collection.find():
            logging.debug('Controling Switch')
            logging.info(item)
            print(item)

if __name__ == '__main__':
    daemon = daemonocle.Daemon(
        worker=main,
        shutdown_callback=cb_shutdown,
        pidfile='/var/run/daemonocle_example.pid',
    )
    daemon.do_action(sys.argv[1])
