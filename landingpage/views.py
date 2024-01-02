from django.shortcuts import render, redirect 


def framer_view(request, path):
    # Extract the path from the URL and construct the framer_embed_url
    framer_embed_url = f"https://long-illuminate-278757.framer.app/{path}"
    return render(request, 'Worki/framer.html', {'framer_embed_url': framer_embed_url})
def framer_view_products(request,path):
     # Extract the path from the URL and construct the framer_embed_url
    framer_embed_url = f"https://long-illuminate-278757.framer.app/products/{path}"
    return render(request, 'Worki/framer.html', {'framer_embed_url': framer_embed_url})