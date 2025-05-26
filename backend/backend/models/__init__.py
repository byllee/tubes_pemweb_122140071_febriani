# backend/models/__init__.py

# Import model-model agar terdaftar di SQLAlchemy
from .produk import Produk
from .mymodel import MyModel

# Konfigurasi ORM
from sqlalchemy.orm import configure_mappers
configure_mappers()

# Import fungsi utilitas database dari meta.py
from .meta import get_engine, get_session_factory, get_tm_session


def includeme(config):
    """
    Fungsi ini akan dijalankan saat konfigurasi Pyramid dilakukan.
    Tujuannya untuk men-setup koneksi database dan session management.
    """
    settings = config.get_settings()

    # Menentukan transaction manager yang digunakan
    settings['tm.manager_hook'] = 'pyramid_tm.explicit_manager'


    # Setup engine dan session factory
    engine = get_engine(settings)
    session_factory = get_session_factory(engine)
    config.registry['dbsession_factory'] = session_factory

    # Menambahkan dbsession ke setiap request Pyramid
    config.add_request_method(
        lambda request: get_tm_session(session_factory, request.tm),
        'dbsession',
        reify=True
    )
