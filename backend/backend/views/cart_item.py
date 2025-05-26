from ..models import CartItem


@view_config(route_name='cartitem_list', renderer='json')
def cartitem_list(request):
    dbsession = request.dbsession
    user_id = request.params.get('user_id')  # misal filter per user lewat query param
    query = dbsession.query(CartItem)
    if user_id:
        query = query.filter_by(user_id=user_id)
    items = query.all()
    return {'cartitems': [i.to_dict() for i in items]}


@view_config(route_name='cartitem_add', request_method='POST', renderer='json')
def cartitem_add(request):
    try:
        json_data = request.json_body
        required_fields = ['user_id', 'produk_id', 'jumlah']
        for field in required_fields:
            if field not in json_data:
                return HTTPBadRequest(json_body={'error': f'Field {field} wajib diisi'})
        
        cartitem = CartItem(
            user_id=json_data['user_id'],
            produk_id=json_data['produk_id'],
            jumlah=int(json_data['jumlah'])
        )
        dbsession = request.dbsession
        dbsession.add(cartitem)
        dbsession.flush()
        
        return {'success': True, 'cartitem': cartitem.to_dict()}
    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})


@view_config(route_name='cartitem_update', request_method='PUT', renderer='json')
def cartitem_update(request):
    dbsession = request.dbsession
    item_id = request.matchdict['id']
    cartitem = dbsession.query(CartItem).filter_by(id=item_id).first()
    if cartitem is None:
        return HTTPNotFound(json_body={'error': 'CartItem tidak ditemukan'})
    try:
        json_data = request.json_body
        if 'jumlah' in json_data:
            cartitem.jumlah = int(json_data['jumlah'])
        return {'success': True, 'cartitem': cartitem.to_dict()}
    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})


@view_config(route_name='cartitem_delete', request_method='DELETE', renderer='json')
def cartitem_delete(request):
    dbsession = request.dbsession
    item_id = request.matchdict['id']
    cartitem = dbsession.query(CartItem).filter_by(id=item_id).first()
    if cartitem is None:
        return HTTPNotFound(json_body={'error': 'CartItem tidak ditemukan'})
    dbsession.delete(cartitem)
    return {'success': True, 'message': f'CartItem dengan id {item_id} berhasil dihapus'}
