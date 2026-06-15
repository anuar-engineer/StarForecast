"""Esquemas de la organización (datos de empresa, editables por el gestor)."""

from pydantic import BaseModel, ConfigDict, Field


class OrganizationRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str


class OrganizationUpdate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
