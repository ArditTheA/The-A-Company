import stripe
from django.conf import settings
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from .models import Subscription

stripe.api_key = settings.STRIPE_SECRET_KEY

@login_required
def create_subscription(request):
    if request.method == 'POST':
        amount = request.POST.get('amount')
        duration = request.POST.get('duration')

        try:
            # Create a Stripe Checkout Session
            session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[{
                    'price': 'YOUR_SUBSCRIPTION_PRICE_ID',
                    'quantity': int(duration),
                }],
                mode='subscription',
                success_url=request.build_absolute_uri('/success/'),
                cancel_url=request.build_absolute_uri('/cancel/'),
            )

            # Create a Subscription object
            subscription = Subscription.objects.create(
                user=request.user,
                amount=amount,
                duration=duration,
                subscription_id=session.subscription,
            )

            # Redirect to Stripe Checkout page
            return redirect(session.url)
        except stripe.error.StripeError as e:
            messages.error(request, str(e))
    
    return render(request, 'subscription_form.html')

@login_required
@csrf_exempt
def cancel_subscription(request):
    if request.method == 'POST':
        subscription_id = request.POST.get('subscription_id')
        
        try:
            # Retrieve subscription from Stripe
            subscription = stripe.Subscription.retrieve(subscription_id)
            
            # Cancel the subscription
            subscription.delete()
            
            # Delete the subscription record from the database
            Subscription.objects.filter(subscription_id=subscription_id).delete()

            messages.success(request, 'Subscription canceled successfully.')
        except stripe.error.StripeError as e:
            messages.error(request, str(e))
    
    return redirect('subscription_form')
