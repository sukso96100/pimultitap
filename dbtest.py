import logging
import sys
import time

# from peewee import *
import sqlite3
db = sqlite3.connect('config.db')
cursor = db.cursor()
print("db Test")
cursor.execute('SELECT * FROM config ORDER BY NUM')
mydata = cursor.fetchall()
print (mydata)




# db = SqliteDatabase('config.db', threadlocals=True)
#
#
# class config(Model):
#     NUM = IntegerField()
#     NAME = CharField()
#     STATE = BooleanField()
#
#     class Meta:
#         database = db
# for item in config.select():
#     print(item.NAME)
