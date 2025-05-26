from sqlalchemy import (
    Column,
    Integer,
    ForeignKey,
)
from sqlalchemy.orm import relationship
from .meta import Base

class CartItem(Base):
    __tablename__ = 'cart_item'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)  # pemilik keranjang
    produk_id = Column(Integer, ForeignKey('produk.id'), nullable=False)
    jumlah = Column(Integer, nullable=False)

    # Relasi ke user dan produk
    user = relationship('User', back_populates='cart_items')
    produk = relationship('Produk')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'produk_id': self.produk_id,
            'jumlah': self.jumlah,
            'produk': self.produk.to_dict() if self.produk else None,
        }
