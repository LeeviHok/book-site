from pydantic import BaseModel, Extra
from pydantic.types import constr

from .models import BOOK_AUTHOR_MAX_LEN, BOOK_TITLE_MAX_LEN


class BookBase(BaseModel, extra=Extra.ignore):
    author: constr(max_length=BOOK_AUTHOR_MAX_LEN)
    title: constr(max_length=BOOK_TITLE_MAX_LEN)
    description: str


class BookCreate(BookBase):
    pass


class Book(BookBase):
    id: int

    class Config:
        orm_mode = True
