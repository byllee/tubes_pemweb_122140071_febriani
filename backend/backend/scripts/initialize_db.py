import argparse
import sys
from pyramid.paster import bootstrap, setup_logging
from sqlalchemy.exc import OperationalError

from backend.models.meta import Base  # Untuk create_all
from backend.models.produk import Produk  # Import model Produk


def setup_models(dbsession):
    """
    Tambahkan data awal ke dalam tabel produk.
    """
    produk1 = Produk(
        nama='Mawar Merah',
        deskripsi='Buketan mawar merah segar untuk hadiah romantis.',
        harga=150000.00,
        stok=10,
        gambar_url='https://example.com/images/mawar_merah.jpg'
    )
    produk2 = Produk(
        nama='Lily Putih',
        deskripsi='Rangkaian lily putih elegan cocok untuk ucapan simpati.',
        harga=175000.00,
        stok=7,
        gambar_url='https://example.com/images/lily_putih.jpg'
    )
    produk3 = Produk(
        nama='Tulip Campuran',
        deskripsi='Tulip warna-warni segar dalam vas kaca eksklusif.',
        harga=200000.00,
        stok=5,
        gambar_url='https://example.com/images/tulip_campuran.jpg'
    )

    dbsession.add_all([produk1, produk2, produk3])


def parse_args(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument(
        'config_uri',
        help='Configuration file, e.g., development.ini',
    )
    return parser.parse_args(argv[1:])


def main(argv=sys.argv):
    args = parse_args(argv)
    setup_logging(args.config_uri)
    env = bootstrap(args.config_uri)

    try:
        # Dapatkan engine langsung dari dbsession bind
        engine = env['request'].dbsession.bind
        print("Membuat tabel-tabel di database jika belum ada...")
        Base.metadata.create_all(bind=engine)

        with env['request'].tm:
            dbsession = env['request'].dbsession
            setup_models(dbsession)
            print("Data produk awal berhasil ditambahkan.")

    except OperationalError as e:
        print('''
Pyramid mengalami masalah saat mengakses database Anda.

Pastikan database telah berjalan dan string koneksi
di file development.ini sudah benar.
''')
        print(str(e))


if __name__ == '__main__':
    main()
