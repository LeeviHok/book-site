import os

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

try:
    PSQL_USER = os.environ['PSQL_USER']
    PSQL_PWD = os.environ['PSQL_PWD']
    PSQL_DOMAIN = os.environ['PSQL_DOMAIN']
    PSQL_DB = os.environ['PSQL_DB']
except KeyError as e:
    raise KeyError(f'Environment variable is not set: {e}. It is required to '
                    'connect to the database.') from e

PSQL_DATABASE_URL =(
    f'postgresql://{PSQL_USER}:{PSQL_PWD}@{PSQL_DOMAIN}/{PSQL_DB}'
)

# TODO: Add explanation of why this keepalive thing is necessary in the first place
#
# Define database connection parameters.
# - keepalives:           Keep idle connections alive
# - keepalives_idle:      Send keepalive msg when connection has idled 120s
# - keepalives_interval:  Retransmit keepalive msg with 10s interval if not ACK
# - keepalives_count:     Retransmit 5 times before considering connection dead
engine = create_engine(
    PSQL_DATABASE_URL,
        connect_args={
            "keepalives": 1,
            "keepalives_idle": 120,
            "keepalives_interval": 10,
            "keepalives_count": 5,
        }
    )
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
