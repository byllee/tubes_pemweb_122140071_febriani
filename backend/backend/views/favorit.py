from ..models import Favorit


@view_config(route_name='favorit_list', renderer='json')
def favorit_list(request):
    dbsession = request.dbsession
    user_id = request.params.get('user_id')
    query = dbsession.query(Favorit)
    if user_id:
        query = query.filter_by(user_id=user_id)
    favorit_items = query.all()
    return {'favorits': [f.to_dict() for f in favorit_items]}


@view_config(route_name='favorit_add', request_method='POST', renderer='json')
def favorit_add(request):
    try:
        json_data = request.json_body
        required_fields = ['user_id', 'produk_id']
        for field in required_fields:
            if field not in json_data:
                return HTTPBadRequest(json_body={'error': f'Field {field} wajib diisi'})
        
        favorit = Favorit(
            user_id=json_data['user_id'],
            produk_id=json_data['produk_id']
        )
        dbsession = request.dbsession
        dbsession.add(favorit)
        dbsession.flush()
        
        return {'success': True, 'favorit': favorit.to_dict()}
    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})


@view_config(route_name='favorit_delete', request_method='DELETE', renderer='json')
def favorit_delete(request):
    dbsession = request.dbsession
    favorit_id = request.matchdict['id']
    favorit = dbsession.query(Favorit).filter_by(id=favorit_id).first()
    if favorit is None:
        return HTTPNotFound(json_body={'error': 'Favorit tidak ditemukan'})
    dbsession.delete(favorit)
    return {'success': True, 'message': f'Favorit dengan id {favorit_id} berhasil dihapus'}
