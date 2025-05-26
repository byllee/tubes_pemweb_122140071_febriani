from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Numeric,
)

from .meta import Base


class Produk(Base):
    """Model untuk tabel produk bunga"""
    __tablename__ = 'produk'
    id = Column(Integer, primary_key=True)
    nama = Column(String(100), nullable=False)
    deskripsi = Column(Text)
    harga = Column(Numeric(10, 2), nullable=False)
    stok = Column(Integer, nullable=False)
    gambar_url = Column(Text)

    def to_dict(self):
        return {
            'id': self.id,
            'nama': self.nama,
            'deskripsi': self.deskripsi,
            'harga': float(self.harga),
            'stok': self.stok,
            'gambar_url': self.gambar_url,
        }
