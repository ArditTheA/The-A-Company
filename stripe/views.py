import stripe

from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def payment(request):
    stripe.api_key = settings.STRIPE_SECRET_KEY
    try:
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price': 'price_1Msm5sAWWrYDd3Ex33E1Wx0D',
                'quantity': 1,
            }],
            mode='payment',
            success_url='https://example.com/success/',
            cancel_url='https://example.com/cancel/',
        )
        return JsonResponse({'sessionId': checkout_session['id']})
    except Exception as e:
        return JsonResponse({'error': str(e)})
