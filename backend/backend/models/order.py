from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey,
    Numeric,
)
from sqlalchemy.orm import relationship
from datetime import datetime
from .meta import Base


class Order(Base):
    """Model untuk menyimpan data pesanan pengguna"""
    __tablename__ = 'order'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    status_pembayaran = Column(String(50), default='Belum Dibayar')  # Bisa: Belum Dibayar, Lunas, Gagal
    metode_pembayaran = Column(String(100), nullable=True)  # Misalnya: Transfer, COD, dll
    total_harga = Column(Numeric(10, 2), nullable=False)
    tanggal_order = Column(DateTime, default=datetime.utcnow)

    user = relationship('User', back_populates='orders')
    items = relationship('OrderItem', back_populates='order', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'status_pembayaran': self.status_pembayaran,
            'metode_pembayaran': self.metode_pembayaran,
            'total_harga': float(self.total_harga) if self.total_harga is not None else None,
            'tanggal_order': self.tanggal_order.isoformat() if self.tanggal_order else None,
            'order_items': [item.to_dict() for item in self.order_items] if hasattr(self, 'order_items') else [],
        }
