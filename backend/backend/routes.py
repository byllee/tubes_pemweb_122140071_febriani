def includeme(config):
    """Add routes to the config."""
    config.add_static_view('static', 'static', cache_max_age=3600)
    
    # Default route
    config.add_route('home', '/')
    
    # Produk routes
    config.add_route('produk_list', '/api/produk', request_method='GET')
    config.add_route('produk_detail', '/api/produk/{id}', request_method='GET')
    config.add_route('produk_add', '/api/produk', request_method='POST')
    config.add_route('produk_update', '/api/produk/{id}', request_method='PUT')
    config.add_route('produk_delete', '/api/produk/{id}', request_method='DELETE')
    
    # User routes (misal untuk register, login, lihat profil)
    config.add_route('user_list', '/api/user', request_method='GET')  # hanya untuk admin
    config.add_route('user_detail', '/api/user/{id}', request_method='GET')
    config.add_route('user_register', '/api/user/register', request_method='POST')
    config.add_route('user_login', '/api/user/login', request_method='POST')
    
    # Order routes
    config.add_route('order_list', '/api/order', request_method='GET')  # Untuk admin & user 
    config.add_route('order_detail', '/api/order/{id}', request_method='GET')
    config.add_route('order_add', '/api/order', request_method='POST')
    config.add_route('order_update', '/api/order/{id}', request_method='PUT')
    config.add_route('order_delete', '/api/order/{id}', request_method='DELETE')
    
    # OrderItem routes 
    config.add_route('orderitem_list', '/api/orderitem', request_method='GET')
    config.add_route('orderitem_detail', '/api/orderitem/{id}', request_method='GET')
    config.add_route('orderitem_add', '/api/orderitems', request_method='POST')
    config.add_route('orderitem_update', '/api/orderitems/{id}', request_method='PUT')
    config.add_route('orderitem_delete', '/api/orderitems/{id}', request_method='DELETE')

    # CartItem routes
    config.add_route('cartitem_list', '/api/cartitem', request_method='GET')  # Lihat isi keranjang user
    config.add_route('cartitem_add', '/api/cartitem', request_method='POST')
    config.add_route('cartitem_update', '/api/cartitem/{id}', request_method='PUT')
    config.add_route('cartitem_delete', '/api/cartitem/{id}', request_method='DELETE')
    
    # Favorit routes
    config.add_route('favorit_list', '/api/favorit', request_method='GET')  # Lihat daftar favorit user
    config.add_route('favorit_add', '/api/favorit', request_method='POST')
    config.add_route('favorit_delete', '/api/favorit/{id}', request_method='DELETE')
