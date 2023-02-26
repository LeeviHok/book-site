from fastapi import APIRouter, Depends, FastAPI, Response
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import engine, SessionLocal

models.Base.metadata.create_all(bind=engine)

# Prefix for all endpoints and documentation
API_PREFIX = '/api'
DOCS_URL = f'{API_PREFIX}/docs'
REDOC_URL = f'{API_PREFIX}/redoc'

app = FastAPI(docs_url=DOCS_URL, redoc_url=REDOC_URL)
prefix_router = APIRouter(prefix=API_PREFIX)

# Yield database session, which is used as a dependency for API endpoints.
# Session is rolled back automatically if any unhandled exception occurs within
# the endpoint, and closed after endpoint is finished.
def get_db():
    db = SessionLocal()
    try:
        yield db
    except:
        db.rollback()
        raise
    finally:
        db.close()

@prefix_router.get('/books', response_model=list[schemas.Book])
def get_books(db: Session = Depends(get_db)):
    return crud.get_books(db)

@prefix_router.post('/books', response_model=schemas.Book)
def create_book(data: schemas.BookCreate, db: Session = Depends(get_db)):
    return crud.create_book(data, db)

@prefix_router.get('/books/{id}', response_model=schemas.Book)
def get_book(id: int, db: Session = Depends(get_db)):
    return crud.get_book(id, db)

@prefix_router.put('/books/{id}', response_model=schemas.Book)
def update_book(id: int, data: schemas.Book, db: Session = Depends(get_db)):
    return crud.update_book(id, data, db)

@prefix_router.delete('/books/{id}', status_code=204, response_class=Response)
def delete_book(id: int, db: Session = Depends(get_db)):
    crud.delete_book(id, db)

app.include_router(prefix_router)
