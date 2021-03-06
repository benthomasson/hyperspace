import uuid
from datetime import datetime

from pydantic import BaseModel
from pydantic import confloat
from pydantic import StrictStr
from pydantic import validator

from typing import Optional

from fastapi_users import schemas


class ProducerMessage(BaseModel):
    name: StrictStr
    message_id: StrictStr = ""
    timestamp: StrictStr = ""
    lat: confloat(gt=-90, lt=90)
    lon: confloat(gt=-180, lt=180)

    @validator("message_id", pre=True, always=True)
    def set_id_from_name_uuid(cls, v, values):
        if "name" in values:
            return f"{values['name']}_{uuid.uuid4()}"
        else:
            raise ValueError("name not set")

    @validator("timestamp", pre=True, always=True)
    def set_datetime_utcnow(cls, v):
        return str(datetime.utcnow())


class ProducerResponse(BaseModel):
    name: StrictStr
    message_id: StrictStr
    topic: StrictStr
    timestamp: StrictStr = ""

    @validator("timestamp", pre=True, always=True)
    def set_datetime_utcnow(cls, v):
        return str(datetime.utcnow())


class RuleSetFile(BaseModel):
    name: StrictStr
    rulesets: StrictStr
    id: Optional[int]


class Inventory(BaseModel):
    name: StrictStr
    inventory: StrictStr
    id: Optional[int]


class Extravars(BaseModel):
    name: StrictStr
    extravars: StrictStr
    id: Optional[int]


class Activation(BaseModel):
    id: Optional[int]
    name: StrictStr
    rulesetfile_id: int
    inventory_id: int
    extravars_id: int


class ActivationLog(BaseModel):
    activation_id: int
    log: StrictStr
    id: Optional[int]


class Project(BaseModel):
    id: Optional[int]
    git_hash: Optional[StrictStr]
    url: StrictStr



# Fast API Users

class UserRead(schemas.BaseUser[uuid.UUID]):
    pass


class UserCreate(schemas.BaseUserCreate):
    pass


class UserUpdate(schemas.BaseUserUpdate):
    pass
