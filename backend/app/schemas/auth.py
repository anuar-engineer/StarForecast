"""Esquemas de autenticación: registro, login, token y usuario."""

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserCreate(BaseModel):
    email: EmailStr
    name: str = Field(min_length=1, max_length=120)
    password: str = Field(min_length=8, max_length=128)
    company: str | None = Field(default=None, max_length=120)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    email: EmailStr
    name: str
    company: str | None = None
    role: str = "owner"


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserRead


class ProfileUpdate(BaseModel):
    name: str = Field(min_length=1, max_length=120)


class PasswordChange(BaseModel):
    current_password: str
    new_password: str = Field(min_length=8, max_length=128)
