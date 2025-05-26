from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Numeric,
)
from sqlalchemy.orm import relationship
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

    # Relasi ke tabel lain
    order_items = relationship("OrderItem", back_populates="produk", cascade="all, delete-orphan")
    in_cart_by = relationship("CartItem", back_populates="produk", cascade="all, delete-orphan")
    favorite_by = relationship("Favorite", back_populates="produk", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'nama': self.nama,
            'deskripsi': self.deskripsi,
            'harga': float(self.harga),
            'stok': self.stok,
            'gambar_url': self.gambar_url,
        }
