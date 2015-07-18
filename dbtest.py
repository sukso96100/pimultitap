import logging
import sys
import time

from peewee import *

print("db Test")

db = SqliteDatabase('config.db', threadlocals=True)


class config(Model):
    NUM = IntegerField()
    NAME = CharField()
    STATE = BooleanField()

    class Meta:
        database = db
for item in config.select():
    print(item.NAME)
