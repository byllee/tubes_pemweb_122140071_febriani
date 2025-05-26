def includeme(config):
    """Add routes to the config."""
    config.add_static_view('static', 'static', cache_max_age=3600)
    
    # Default route
    config.add_route('home', '/')
    
    # Produk routes dengan request_method untuk membedakan endpoint dengan URL yang sama
    config.add_route('produk_list', '/api/produk', request_method='GET')
    config.add_route('produk_detail', '/api/produk/{id}', request_method='GET')
    config.add_route('produk_add', '/api/produk', request_method='POST')
    config.add_route('produk_update', '/api/produk/{id}', request_method='PUT')
    config.add_route('produk_delete', '/api/produk/{id}', request_method='DELETE')

