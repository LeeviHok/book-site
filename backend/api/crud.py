from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from . import models, schemas

def get_book(book_id: int, db: Session):
    book = db.get(models.Book, book_id)
    if not book:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Book with given ID does not exist.'
        )
    return book

def get_books(db: Session):
    return db.execute(select(models.Book)).scalars().all()

def create_book(book_data: schemas.BookCreate, db: Session):
    book = models.Book(**book_data.dict())

    db.add(book)
    db.commit()

    db.refresh(book)
    return book

def update_book(book_id: int, book_data: schemas.Book, db: Session):
    if book_id != book_data.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Resource ID in request body does not match the ID in URI.'
        )

    book = get_book(book_id, db)

    for book_attribute, value in book_data.dict().items():
        setattr(book, book_attribute, value)

    db.commit()

    db.refresh(book)
    return book

def delete_book(book_id: int, db: Session):
    book = get_book(book_id, db)
    db.delete(book)
    db.commit()
