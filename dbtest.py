import logging
import sys
import time

from peewee import *

print("db Test")

db = SqliteDatabase('config.db', threadlocals=True)


class Configs(Model):
    NUM = IntegerField()
    NAME = CharField()
    STATE = BooleanField()

    class Meta:
        database = db
for item in Configs.select():
    print(item.NAME)
