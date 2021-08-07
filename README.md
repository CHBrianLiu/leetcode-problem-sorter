# Leetcode Problem Sorter

> Check out the repository website (link is beneath the repository description) for quick usage.

When it comes to the coding interview, Leetcode is an awesome website that contains enormous number of problems. However, it lacks a mechanism to sort the problems based on the rating. This CLI tool can help you list out the problems sorted by your preferred rating.

## Requirements

* Python 3

## How to use

Clone the project, then install the dependencies.

```bash
git clone https://github.com/CHBrianLiu/leetcode-problem-sorter.git && cd leetcode-problem-sorter
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
alias leetcode-sorter="python -m leetcode-sorter"
```

To list all non-paid-only problems sorted by the number of likes.

```bash
$ leetcode-sorter
```

Use the filter options.

```bash
$ leetcode-sorter --difficulty easy
```

Export to CSV file in the project root folder and sorted by likes-to-dislikes ratio.

```bash
$ leetcode-sorter --sorted_by ratio --csv_path ratio.csv
```

### Available options

| name            | code                  | options                                                      | default | description                                                                                              |
| --------------- | --------------------- | ------------------------------------------------------------ | ------- | -------------------------------------------------------------------------------------------------------- |
| difficulty      | `--difficulty`        | `easy`, `medium`, and `hard`                                 | None    | Only the problems with the specified difficulty will be listed. Default is listing out all difficulties. |
| paid only       | `--include-paid-only` | N/A                                                          | False   | If the flag is on, the paid-only problems are listed as well.                                            |
| exclude done    | `--exclude-done`      | N/A                                                          | False   | If the flag is on, the problem that has been finished will not be listed.                                |
| sort            | `--sorted_by`         | `likes`, `dislikes`, and `ratio`                             | `likes` | `ratio` means likes to dislikes ratio.                                                                   |
| reverse         | `--reverse`           | N/A                                                          | False   | The default sorting sequence is upside down. Use the flag to make the order reversed.                    |
| export csv file | `--csv_path`          | The relative path to the exported file, e.g. `leetcode.csv`. | None    | When this option is provided, the CLI will generate a CSV file instead of printing on the console.       |
