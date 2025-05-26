from pyramid.view import view_config
from pyramid.httpexceptions import (
    HTTPFound,
    HTTPNotFound,
    HTTPBadRequest,
)
from ..models import Produk


@view_config(route_name='produk_list', renderer='json')
def produk_list(request):
    """View untuk menampilkan daftar produk"""
    dbsession = request.dbsession
    produks = dbsession.query(Produk).all()
    return {'produks': [p.to_dict() for p in produks]}


@view_config(route_name='produk_detail', renderer='json')
def produk_detail(request):
    """View untuk melihat detail satu produk"""
    dbsession = request.dbsession
    produk_id = request.matchdict['id']
    produk = dbsession.query(Produk).filter_by(id=produk_id).first()
    
    if produk is None:
        return HTTPNotFound(json_body={'error': 'Produk tidak ditemukan'})
    
    return {'produk': produk.to_dict()}


@view_config(route_name='produk_add', request_method='POST', renderer='json')
def produk_add(request):
    """View untuk menambahkan produk baru"""
    try:
        json_data = request.json_body
        
        # Validasi data wajib
        required_fields = ['nama', 'deskripsi', 'harga', 'stok', 'gambar_url']
        for field in required_fields:
            if field not in json_data:
                return HTTPBadRequest(json_body={'error': f'Field {field} wajib diisi'})
        
        # Validasi tipe harga dan stok
        try:
            harga = float(json_data['harga'])
            stok = int(json_data['stok'])
        except ValueError:
            return HTTPBadRequest(json_body={'error': 'Harga harus angka dan stok harus integer'})
        
        produk = Produk(
            nama=json_data['nama'],
            deskripsi=json_data['deskripsi'],
            harga=harga,
            stok=stok,
            gambar_url=json_data['gambar_url']
        )
        
        dbsession = request.dbsession
        dbsession.add(produk)
        dbsession.flush()  # supaya dapat id
        
        return {'success': True, 'produk': produk.to_dict()}
    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})


@view_config(route_name='produk_update', request_method='PUT', renderer='json')
def produk_update(request):
    """View untuk mengupdate data produk"""
    dbsession = request.dbsession
    produk_id = request.matchdict['id']
    
    produk = dbsession.query(Produk).filter_by(id=produk_id).first()
    if produk is None:
        return HTTPNotFound(json_body={'error': 'Produk tidak ditemukan'})
    
    try:
        json_data = request.json_body
        
        if 'nama' in json_data:
            produk.nama = json_data['nama']
        if 'deskripsi' in json_data:
            produk.deskripsi = json_data['deskripsi']
        if 'harga' in json_data:
            try:
                produk.harga = float(json_data['harga'])
            except ValueError:
                return HTTPBadRequest(json_body={'error': 'Harga harus angka'})
        if 'stok' in json_data:
            try:
                produk.stok = int(json_data['stok'])
            except ValueError:
                return HTTPBadRequest(json_body={'error': 'Stok harus integer'})
        if 'gambar_url' in json_data:
            produk.gambar_url = json_data['gambar_url']
        
        return {'success': True, 'produk': produk.to_dict()}
    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})


@view_config(route_name='produk_delete', request_method='DELETE', renderer='json')
def produk_delete(request):
    """View untuk menghapus produk"""
    dbsession = request.dbsession
    produk_id = request.matchdict['id']
    
    produk = dbsession.query(Produk).filter_by(id=produk_id).first()
    if produk is None:
        return HTTPNotFound(json_body={'error': 'Produk tidak ditemukan'})
    
    dbsession.delete(produk)
    
    return {'success': True, 'message': f'Produk dengan id {produk_id} berhasil dihapus'}
