from sqlalchemy import Column, Integer, String, Text

from .database import Base

AUTHOR_MAX_LEN = 500
TITLE_MAX_LEN = 500


class Book(Base):
    __tablename__ = 'books'

    id = Column(Integer, primary_key=True, index=True)
    author = Column(String(length=AUTHOR_MAX_LEN), nullable=False)
    title = Column(String(length=TITLE_MAX_LEN), nullable=False)
    description = Column(Text, nullable=False)

    # Printable representation of the book object
    def __repr__(self):
        return f'Title: {self.title}, Author: {self.author}'
