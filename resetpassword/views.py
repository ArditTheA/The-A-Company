from django.shortcuts import render, redirect
from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponse
from django.contrib.auth.forms import PasswordResetForm
from django.contrib.auth.models import User
from django.template.loader import render_to_string
from django.db.models.query_utils import Q
from django.utils.http import urlsafe_base64_encode
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from accounts.models import CustomUser


def password_reset_request(request):
	if request.method == "POST":
		password_reset_form = PasswordResetForm(request.POST)
		if password_reset_form.is_valid():
			print("requesit is on progresss")
			data = password_reset_form.cleaned_data['email']
			associated_users = CustomUser.objects.filter(Q(email=data))
			if associated_users.exists():
				for user in associated_users:
					subject = "Reset your password"
					email_template_name = "main/password/password_reset_email.txt"
					c = {
					"email":user.email,
					'domain':'worki.global',
					'site_name': 'Worki',
					"uid": urlsafe_base64_encode(force_bytes(user.pk)),
					"user": user,
					'token': default_token_generator.make_token(user),
					'protocol': 'https',
					}
					email = render_to_string(email_template_name, c)
					try:
						send_mail(subject, email, 'worki@worki.global' , [user.email], fail_silently=False)
					except BadHeaderError:
						return HttpResponse('Invalid header found.')
					return redirect ("/password_reset/done/")
	password_reset_form = PasswordResetForm()
	return render(request=request, template_name="main/password/password_reset.html", context={"password_reset_form":password_reset_form})







from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template
from django.template import Context
from django.conf import settings

def send_email_with_template(request):
    # Render the template
    context = {'image_url': 'https://worki.global/static/img/12.jpeg',
               'link_url': 'https://worki.global',
			   "user":request.user}
    template = get_template('QualifiedEmail.html')
    html_content = template.render(context)

    # Create and send the email
    msg = EmailMultiAlternatives(
        'Welcome to our site!',
        'Thank you for creating an account with us.',
        'Worki hello@worki.global',
        [request.user.email]
    )
    msg.attach_alternative(html_content, "text/html")
    msg.send()
