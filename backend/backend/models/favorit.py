from sqlalchemy import (
    Column,
    Integer,
    ForeignKey,
    UniqueConstraint,
)
from sqlalchemy.orm import relationship
from .meta import Base

class Favorit(Base):
    __tablename__ = 'favorit'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    produk_id = Column(Integer, ForeignKey('produk.id'), nullable=False)

    user = relationship('User', back_populates='favorits')
    produk = relationship('Produk')

    __table_args__ = (
        UniqueConstraint('user_id', 'produk_id', name='uix_user_produk'),
    )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'produk_id': self.produk_id,
            'produk': self.produk.to_dict() if self.produk else None,
        }
