from pyramid.view import view_config
from pyramid.httpexceptions import HTTPNotFound, HTTPBadRequest
from ..models import Order


@view_config(route_name='order_list', renderer='json')
def order_list(request):
    dbsession = request.dbsession
    orders = dbsession.query(Order).all()
    return {'orders': [o.to_dict() for o in orders]}


@view_config(route_name='order_detail', renderer='json')
def order_detail(request):
    dbsession = request.dbsession
    order_id = request.matchdict['id']
    order = dbsession.query(Order).filter_by(id=order_id).first()
    if order is None:
        return HTTPNotFound(json_body={'error': 'Order tidak ditemukan'})
    return {'order': order.to_dict()}


@view_config(route_name='order_add', request_method='POST', renderer='json')
def order_add(request):
    try:
        json_data = request.json_body
        
        # Validasi data wajib, misal user_id dan total_harga
        required_fields = ['user_id', 'total_harga', 'status']
        for field in required_fields:
            if field not in json_data:
                return HTTPBadRequest(json_body={'error': f'Field {field} wajib diisi'})
        
        order = Order(
            user_id=json_data['user_id'],
            total_harga=float(json_data['total_harga']),
            status=json_data['status']
        )
        
        dbsession = request.dbsession
        dbsession.add(order)
        dbsession.flush()
        
        return {'success': True, 'order': order.to_dict()}
    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})


@view_config(route_name='order_update', request_method='PUT', renderer='json')
def order_update(request):
    dbsession = request.dbsession
    order_id = request.matchdict['id']
    order = dbsession.query(Order).filter_by(id=order_id).first()
    
    if order is None:
        return HTTPNotFound(json_body={'error': 'Order tidak ditemukan'})
    
    try:
        json_data = request.json_body
        
        if 'status' in json_data:
            order.status = json_data['status']
        if 'total_harga' in json_data:
            try:
                order.total_harga = float(json_data['total_harga'])
            except ValueError:
                return HTTPBadRequest(json_body={'error': 'total_harga harus angka'})
        
        return {'success': True, 'order': order.to_dict()}
    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})


@view_config(route_name='order_delete', request_method='DELETE', renderer='json')
def order_delete(request):
    dbsession = request.dbsession
    order_id = request.matchdict['id']
    order = dbsession.query(Order).filter_by(id=order_id).first()
    if order is None:
        return HTTPNotFound(json_body={'error': 'Order tidak ditemukan'})
    dbsession.delete(order)
    return {'success': True, 'message': f'Order dengan id {order_id} berhasil dihapus'}
