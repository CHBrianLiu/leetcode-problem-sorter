from pydantic import Field

from .index import StatStatusPair


class Problem(StatStatusPair):
    likes: int = Field(0, ge=0)
    dislikes: int = Field(0, ge=0)
