from pyramid.view import view_config
from pyramid.httpexceptions import HTTPNotFound, HTTPBadRequest
from ..models import OrderItem


@view_config(route_name='orderitem_list', renderer='json')
def orderitem_list(request):
    dbsession = request.dbsession
    items = dbsession.query(OrderItem).all()
    return {'orderitems': [i.to_dict() for i in items]}


@view_config(route_name='orderitem_detail', renderer='json')
def orderitem_detail(request):
    dbsession = request.dbsession
    item_id = request.matchdict['id']
    item = dbsession.query(OrderItem).filter_by(id=item_id).first()
    if item is None:
        return HTTPNotFound(json_body={'error': 'OrderItem tidak ditemukan'})
    return {'orderitem': item.to_dict()}


@view_config(route_name='orderitem_add', request_method='POST', renderer='json')
def orderitem_add(request):
    try:
        json_data = request.json_body
        required_fields = ['order_id', 'produk_id', 'jumlah', 'harga_satuan']
        for field in required_fields:
            if field not in json_data:
                return HTTPBadRequest(json_body={'error': f'Field {field} wajib diisi'})
        
        orderitem = OrderItem(
            order_id=int(json_data['order_id']),
            produk_id=int(json_data['produk_id']),
            jumlah=int(json_data['jumlah']),
            harga_satuan=float(json_data['harga_satuan'])
        )
        dbsession = request.dbsession
        dbsession.add(orderitem)
        dbsession.flush()
        
        return {'success': True, 'orderitem': orderitem.to_dict()}
    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})


@view_config(route_name='orderitem_update', request_method='PUT', renderer='json')
def orderitem_update(request):
    dbsession = request.dbsession
    item_id = request.matchdict['id']
    orderitem = dbsession.query(OrderItem).filter_by(id=item_id).first()
    if orderitem is None:
        return HTTPNotFound(json_body={'error': 'OrderItem tidak ditemukan'})
    try:
        json_data = request.json_body
        if 'order_id' in json_data:
            orderitem.order_id = int(json_data['order_id'])
        if 'produk_id' in json_data:
            orderitem.produk_id = int(json_data['produk_id'])
        if 'jumlah' in json_data:
            orderitem.jumlah = int(json_data['jumlah'])
        if 'harga_satuan' in json_data:
            orderitem.harga_satuan = float(json_data['harga_satuan'])
        return {'success': True, 'orderitem': orderitem.to_dict()}
    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})


@view_config(route_name='orderitem_delete', request_method='DELETE', renderer='json')
def orderitem_delete(request):
    dbsession = request.dbsession
    item_id = request.matchdict['id']
    orderitem = dbsession.query(OrderItem).filter_by(id=item_id).first()
    if orderitem is None:
        return HTTPNotFound(json_body={'error': 'OrderItem tidak ditemukan'})
    dbsession.delete(orderitem)
    return {'success': True, 'message': f'OrderItem dengan id {item_id} berhasil dihapus'}
