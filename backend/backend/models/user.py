from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from .meta import Base

class User(Base):
    """Model untuk pengguna (admin & pelanggan)"""
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(128), nullable=False)  # password hash
    is_admin = Column(Boolean, default=False)

    # Relasi
    orders = relationship("Order", back_populates="user", cascade="all, delete-orphan")
    cart_items = relationship("CartItem", back_populates="user", cascade="all, delete-orphan")
    favorites = relationship("Favorite", back_populates="user", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'is_admin': self.is_admin
        }
