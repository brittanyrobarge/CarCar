# Generated by Django 4.0.3 on 2024-02-08 19:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='recordofsale',
            old_name='sales_person',
            new_name='salesperson',
        ),
    ]