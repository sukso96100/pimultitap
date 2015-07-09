import logging
import sys
import time

from pymongo import MongoClient
print("db Test")
client = MongoClient('mongodb://localhost/')
db = client.relayswitch
collection = db.switchesconfigs
# collection.find_one()
collection.find()
for item in collection.find():
    print("found")
    print(item)
