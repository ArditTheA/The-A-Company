from datetime import timezone, datetime

from django.http import BadHeaderError, HttpResponse

from accounts.models import Jobs
from django.shortcuts import render, redirect
from django.contrib import messages
from django.template.loader import render_to_string
from django.conf import settings
from .models import Subscription
import stripe
# stripe.api_key = settings.STRIPE_SECRET_KEY

from django.core.mail import send_mail, EmailMultiAlternatives
from django.conf import settings



stripe.api_key = 'sk_test_51MfP4FAWWrYDd3Ex3UdXVUsgjFblWSAiI8yvsEPm83iAlH1LaWGnS9fquylP0AknVsr7HfKs6m3wsArtQgVFaliw00QqQKsitp'




    # Your code here







def send_confirmation_email(email):
    subject = 'Payment Confirmation'
    message = 'Thank you for your payment. We have received your payment successfully.'
    from_email = settings.DEFAULT_FROM_EMAIL
    recipient_list = [email]

    send_mail(subject, message, from_email, recipient_list)


def payment_process(request):
    jobid = Jobs.objects.get(id=9)
    monthPay = int(jobid.programCost) / 12
    print(monthPay)
    if jobid.country_j == "USA":
        pass
    elif jobid.country_j == "Germany":

        if request.method == 'POST':
            cardholder_name = request.POST['cardholder_name']
            card_number = request.POST['card_number']
            expiry_date = request.POST['expiry_date']
            cvc = request.POST['cvc']
            monthly_price = 50.00  # Monthly price in euros


            try:
                customer = stripe.Customer.create(
                    source=card_number,
                    email=request.user.email,  # Assuming you have user authentication in your application
                    name=cardholder_name  # Cardholder name
                )

                # Create a subscription for the customer
                subscription = stripe.Subscription.create(
                    customer=customer.id,
                    items=[
                        {
                            'price': 'price_1MpHyKAWWrYDd3Ext4DRrhSL',  # Replace with your actual Stripe price ID
                        }
                    ],
                    payment_behavior='default_incomplete',
                    default_payment_method=customer.default_payment_method,
                    trial_period_days=30,  # Optional: Set a trial period for the subscription
                    quantity=12  # Number of months for the subscription
                )

                # Process the successful subscription
                subscription_id = subscription.id

                # Save the subscription details in your database
                subscription_obj = Subscription(
                    user=request.user,  # Assuming you have a user ForeignKey in the Subscription model
                    jobId = jobid,
                    subscription_id=subscription_id,
                    cardholder_name=cardholder_name,
                    card_number=card_number,
                    expiry_date=expiry_date,
                    cvc=cvc,
                    monthly_price=monthly_price
                )
                subscription_obj.save()

                # Send confirmation email
                send_confirmation_email(subscription_obj)

                # Redirect the user to a success page or show a success message
                return redirect('subscription_success')

            except stripe.error.CardError as e:
                # Display error message to the user
                error_message = e.error.message
                messages.error(request, error_message)

    return render(request, 'stripe/payment_form.html')


def cancel_subscription(request, subscription_id):
    try:
        subscription = stripe.Subscription.retrieve(subscription_id)
        subscription.delete()

        # Update the canceled_at field in the Subscription model
        subscription_obj = Subscription.objects.get(subscription_id=subscription_id)
        subscription_obj.canceled_at = datetime.now()
        subscription_obj.save()

        # Send cancellation confirmation email
        send_cancellation_email(subscription_obj)

        messages.success(request, 'Subscription canceled successfully.')
    except stripe.error.StripeError as e:
        messages.error(request, str(e))

    return redirect('subscription_details')


def send_cancellation_email(subscription):
    subject = 'Subscription Cancellation Confirmation'
    message = render_to_string('stripe/cancellation_email.html', {'subscription': "testt"})
    from_email = settings.DEFAULT_FROM_EMAIL
    to_email = subscription.user.email
    email = EmailMultiAlternatives(subject, '', from_email, [to_email])
    html_content = render_to_string('stripe/cancellation_email.html', {'subscription': subscription})

    # Attach the HTML content to the email
    email.attach_alternative(html_content, 'text/html')

    # Send the email
    email.send()


def subscription_details(request):
    subscriptions = Subscription.objects.filter(user=request.user)
    context = {'subscriptions': subscriptions}
    return render(request, 'stripe/subscription_details.html', context)