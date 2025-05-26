from sqlalchemy import (
    Column,
    Integer,
    ForeignKey,
    Numeric,
)
from sqlalchemy.orm import relationship
from .meta import Base

class OrderItem(Base):
    __tablename__ = 'order_item'
    
    id = Column(Integer, primary_key=True)
    
    order_id = Column(Integer, ForeignKey('order.id'), nullable=False)
    produk_id = Column(Integer, ForeignKey('produk.id'), nullable=False)
    
    jumlah = Column(Integer, nullable=False)
    harga_satuan = Column(Numeric(10, 2), nullable=False)  # harga produk saat dipesan
    
    # Relasi ke Order dan Produk
    order = relationship('Order', back_populates='items')
    produk = relationship('Produk')
    
    def to_dict(self):
        return {
            'id': self.id,
            'order_id': self.order_id,
            'produk_id': self.produk_id,
            'jumlah': self.jumlah,
            'harga_satuan': float(self.harga_satuan),
            'produk': self.produk.to_dict() if self.produk else None,
        }
