from enum import IntEnum
from typing import List, Optional

from pydantic import BaseModel


class DifficultyLevel(IntEnum):
    easy = 1
    medium = 2
    hard = 3


class Difficulty(BaseModel):
    level: int


class Stat(BaseModel):
    question_id: str
    question__article__live: Optional[bool]
    question__article__slug: Optional[str]
    question__article__has_video_solution: Optional[bool]
    question__title: str
    question__title_slug: str
    question__hide: bool
    total_acs: int
    total_submitted: int
    frontend_question_id: int
    is_new_question: bool


class StatStatusPair(BaseModel):
    stat: Stat
    status: Optional[str]
    difficulty: Difficulty
    paid_only: bool
    is_favor: bool
    frequency: int
    progress: int


class UserStat(BaseModel):
    user_name: str
    num_solved: int
    num_total: int
    ac_easy: int
    ac_medium: int
    ac_hard: int
    stat_status_pairs: List[StatStatusPair]
