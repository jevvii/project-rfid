from django.db import models


class Attendance(models.Model):
    card_uid = models.ForeignKey('Student', models.DO_NOTHING, db_column='card_uid', to_field='card_uid')
    name = models.CharField(max_length=100)
    date_today = models.DateField()
    time_in = models.TimeField(blank=True, null=True)
    time_out = models.TimeField(blank=True, null=True)
    student_number = models.CharField(max_length=20, blank=True, null=True)
    parent_number = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'attendance'


class Student(models.Model):
    card_uid = models.CharField(unique=True, max_length=20)
    student_name = models.CharField(max_length=50)
    student_number = models.CharField(max_length=20)
    parent_number = models.CharField(max_length=20)
    message = models.TextField()

    class Meta:
        managed = False
        db_table = 'students'
