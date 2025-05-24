import datetime
from pyramid.view import view_config
from pyramid.httpexceptions import HTTPFound, HTTPNotFound, HTTPBadRequest
from ..models import Admin


@view_config(route_name='admin_list', renderer='json')
def admin_list(request):
    """View untuk menampilkan daftar admin"""
    dbsession = request.dbsession
    admins = dbsession.query(Admin).all()
    return {'admins': [a.to_dict() for a in admins]}


@view_config(route_name='admin_detail', renderer='json')
def admin_detail(request):
    """View untuk melihat detail satu admin"""
    dbsession = request.dbsession
    admin_id = request.matchdict['id']
    admin = dbsession.query(Admin).filter_by(id=admin_id).first()

    if admin is None:
        return HTTPNotFound(json_body={'error': 'Admin tidak ditemukan'})

    return {'admin': admin.to_dict()}


@view_config(route_name='admin_add', request_method='POST', renderer='json')
def admin_add(request):
    """View untuk menambahkan admin baru"""
    try:
        json_data = request.json_body
        required_fields = ['username', 'password', 'nama_lengkap']
        for field in required_fields:
            if field not in json_data:
                return HTTPBadRequest(json_body={'error': f'Field {field} wajib diisi'})

        # Jangan lupa hash password di sini untuk produksi!
        admin = Admin(
            username=json_data['username'],
            password=json_data['password'],  # hash password di produksi
            nama_lengkap=json_data['nama_lengkap'],
        )

        dbsession = request.dbsession
        dbsession.add(admin)
        dbsession.flush()

        return {'success': True, 'admin': admin.to_dict()}

    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})


@view_config(route_name='admin_update', request_method='PUT', renderer='json')
def admin_update(request):
    """View untuk mengupdate data admin"""
    dbsession = request.dbsession
    admin_id = request.matchdict['id']

    admin = dbsession.query(Admin).filter_by(id=admin_id).first()
    if admin is None:
        return HTTPNotFound(json_body={'error': 'Admin tidak ditemukan'})

    try:
        json_data = request.json_body
        if 'username' in json_data:
            admin.username = json_data['username']
        if 'password' in json_data:
            admin.password = json_data['password']  # hash di produksi
        if 'nama_lengkap' in json_data:
            admin.nama_lengkap = json_data['nama_lengkap']

        return {'success': True, 'admin': admin.to_dict()}

    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})


@view_config(route_name='admin_delete', request_method='DELETE', renderer='json')
def admin_delete(request):
    """View untuk menghapus data admin"""
    dbsession = request.dbsession
    admin_id = request.matchdict['id']

    admin = dbsession.query(Admin).filter_by(id=admin_id).first()
    if admin is None:
        return HTTPNotFound(json_body={'error': 'Admin tidak ditemukan'})

    dbsession.delete(admin)

    return {'success': True, 'message': f'Admin dengan id {admin_id} berhasil dihapus'}
