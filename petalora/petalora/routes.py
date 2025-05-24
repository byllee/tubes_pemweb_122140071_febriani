def includeme(config):
    """Add routes to the config."""
    config.add_static_view('static', 'static', cache_max_age=3600)
    
    # Default route
    config.add_route('home', '/')
    
    # Admin routes dengan request_method untuk membedakan endpoint dengan URL yang sama
    config.add_route('admin_list', '/api/admin', request_method='GET')
    config.add_route('admin_detail', '/api/admin/{id}', request_method='GET')
    config.add_route('admin_add', '/api/admin', request_method='POST')
    config.add_route('admin_update', '/api/admin/{id}', request_method='PUT')
    config.add_route('admin_delete', '/api/admin/{id}', request_method='DELETE')
