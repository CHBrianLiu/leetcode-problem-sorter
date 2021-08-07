import { Text } from "@fluentui/react/lib/Text";
import { Link } from "@fluentui/react";

const IntroSection = () => {
  return (
    <>
      <Text variant="xxLargePlus">
        Leetcode Problems With Likes and Dislikes
      </Text>
      <Text>
        A convenient entry to Leetcode problems with likes and dislikes helps
        you focus on superb exercises.
      </Text>
      <Text>
        Because Leetcode's official problem list doesn't provide likes and
        dislikes besides the titles, we sometimes wrongly pick a bad one which
        is time-wasting. This page provides you a snapshot of the problems. If
        you want an up-to-date version of the list, consider using the CLI tool
        to generate a list in CSV format.
      </Text>
      <Link href="https://github.com/CHBrianLiu/leetcode-problem-sorter">
        CHBrianLiu/leetcode-problem-sorter
      </Link>
    </>
  );
};

export default IntroSection;
