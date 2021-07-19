from typing import Dict, List, Optional, Union

import requests
from gql import Client, gql
from gql.transport.requests import RequestsHTTPTransport

from .models.index import DifficultyLevel, UserStat
from .models.problem import Problem


class ProblemHandler:
    PROBLEM_LIST_API_ENDPOINT = "https://leetcode.com/api/problems/algorithms/"
    GRAPH_QL_ENDPOINT = "https://leetcode.com/graphql"

    problems: List[Problem]
    difficulty: Optional[str]
    include_paid_only: bool
    exclude_done: bool
    sort_by: str
    reverse: bool

    def __init__(
        self,
        problems: List[Problem],
        difficulty: Optional[str] = None,
        include_paid_only: bool = False,
        include_done: bool = True,
        sort_by: str = "likes",
        reverse: bool = False,
    ) -> None:
        self.problems = problems
        self.difficulty = difficulty
        self.include_paid_only = include_paid_only
        self.exclude_done = include_done
        self.sort_by = sort_by
        self.reverse = reverse

    @classmethod
    def create_by_online_index(cls, **kwargs):
        stat = cls.get_latest_problems()
        problems = []  # type: List[Problem]
        for problem in stat.stat_status_pairs:
            problems.append(Problem.parse_obj(problem.dict()))
        return cls(problems, **kwargs)

    # create_by_local_index(path: str) -> ProblemHandler
    @classmethod
    def get_latest_problems(cls) -> UserStat:
        with requests.get(cls.PROBLEM_LIST_API_ENDPOINT) as response:
            if not response.ok:
                raise RuntimeError(
                    "Failed to download the problem list from the endpoint."
                )
            return UserStat.parse_raw(response.text)

    def filter_problems(self):
        for index in range(len(self.problems) - 1, -1, -1):
            problem = self.problems[index]
            if (
                self.__difficulty_not_qualified(problem)
                or self.__paid_only_filter_not_qualified(problem)
                or self.__undone_only_not_qualified(problem)
            ):
                self.problems.pop(index)
                continue

    def __difficulty_not_qualified(self, problem: Problem):
        return (
            self.difficulty is not None
            and problem.difficulty.level != DifficultyLevel[self.difficulty]
        )

    def __paid_only_filter_not_qualified(self, problem: Problem):
        return not self.include_paid_only and problem.paid_only

    def __undone_only_not_qualified(self, problem: Problem):
        return self.exclude_done and problem.progress == 3

    def retrieve_likes_and_dislikes(self):
        problems_info = self.__get_all_problems_like_dislike_info()
        problem_map = {problem.stat.question_id: problem for problem in self.problems}
        for info in problems_info:
            if info.get("questionId", "") in problem_map:
                problem_map[info["questionId"]].likes = info["likes"]
                problem_map[info["questionId"]].dislikes = info["dislikes"]

    def __get_all_problems_like_dislike_info(self) -> List[Dict[str, Union[str, int]]]:
        transport = RequestsHTTPTransport(
            url=self.GRAPH_QL_ENDPOINT, verify=True, retries=3
        )
        client = Client(transport=transport, fetch_schema_from_transport=True)
        query = gql(
            "query questionData {"
            "  allQuestions {"
            "    questionId "
            "    likes "
            "    dislikes "
            "  }"
            "}"
        )
        return client.execute(query)["allQuestions"]

    def sort_problems(self):
        sort_reverse = not self.reverse
        if self.sort_by == "likes":
            self.problems.sort(key=lambda problem: problem.likes, reverse=sort_reverse)
        elif self.sort_by == "dislikes":
            self.problems.sort(
                key=lambda problem: problem.dislikes, reverse=sort_reverse
            )
        elif self.sort_by == "ratio":
            self.problems.sort(
                key=lambda problem: problem.likes / (problem.dislikes if problem.dislikes > 0 else 1),
                reverse=sort_reverse,
            )

    def print_problems(self):
        for problem in self.problems:
            print(
                f"{problem.stat.question_id}. "
                f"{problem.stat.question__title}, "
                f"likes: {problem.likes}, "
                f"dislikes: {problem.dislikes}. "
                f"Link: https://leetcode.com/problems/{problem.stat.question__title_slug}"
            )
