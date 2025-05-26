from sqlalchemy import (
    Column,
    Integer,
    Text,
)

from .meta import Base


class Admin(Base):
    """ Model untuk tabel admin """
    __tablename__ = 'admin'
    id = Column(Integer, primary_key=True)
    username = Column(Text, unique=True, nullable=False)
    password = Column(Text, nullable=False)
    nama_lengkap = Column(Text, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'password': self.password,  # simpan hash, bukan plain text
            'nama_lengkap': self.nama_lengkap,
        }
