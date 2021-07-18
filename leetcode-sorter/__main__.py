from typing import Optional

import fire

from .problem import ProblemHandler


def main(
    difficulty: Optional[str] = None,
    include_paid_only: bool = False,
    exclude_done: bool = False,
    sort_by: str = "likes",
    reverse: bool = False,
):
    handler = ProblemHandler.create_by_online_index(
        difficulty=difficulty,
        include_paid_only=include_paid_only,
        include_done=exclude_done,
        sort_by=sort_by,
        reverse=reverse,
    )
    handler.filter_problems()
    handler.retrieve_likes_and_dislikes()
    handler.sort_problems()
    handler.print_problems()


if __name__ == "__main__":
    fire.Fire(main)
