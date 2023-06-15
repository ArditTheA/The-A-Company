from datetime import datetime

from django.db import models
from accounts.models import CustomUser,Jobs

class Subscription(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    jobId = models.ForeignKey(Jobs,on_delete=models.CASCADE,null=True,blank=True)
    subscription_id = models.CharField(max_length=255)
    cardholder_name = models.CharField(max_length=255,null=True)
    card_number = models.CharField(max_length=255,null=True)
    expiry_date = models.CharField(max_length=10,null=True)
    cvc = models.CharField(max_length=4,null=True)
    monthly_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at  = models.DateTimeField(default=datetime.now())
    canceled_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.subscription_id


