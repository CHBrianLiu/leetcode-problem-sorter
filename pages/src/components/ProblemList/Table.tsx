import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "@fluentui/react";
import { Dropdown, IDropdownOption } from "@fluentui/react";
import { IColumn, SelectionMode } from "@fluentui/react/lib/DetailsList";
import { ShimmeredDetailsList } from "@fluentui/react/lib/ShimmeredDetailsList";
import { mergeStyleSets } from "@fluentui/react/lib/Styling";

export interface IProblemItem {
  id: number;
  title: string;
  uri: string;
  likes: number;
  dislikes: number;
  ratio: number;
  difficulty: string;
  isPaidOnly: boolean;
}

interface ITableProps {
  items: IProblemItem[];
  loading: boolean;
}
const titleColumnRenderHandler = (item: IProblemItem) => {
  return (
    <Link href={`https://leetcode.com${item.uri}/`} target="new">
      {item.title}
    </Link>
  );
};

const classNames = mergeStyleSets({
  likes: {
    textAlign: "center",
  },
});

const COLUMNS: IColumn[] = [
  {
    key: "id",
    name: "ID",
    fieldName: "id",
    minWidth: 10,
    maxWidth: 40,
    isRowHeader: true,
    isSorted: true,
    isSortedDescending: false,
    data: "string",
    isPadded: true,
  },
  {
    key: "title",
    name: "Title",
    onRender: titleColumnRenderHandler,
    minWidth: 300,
    maxWidth: 400,
    isRowHeader: true,
    data: "string",
    isPadded: true,
    isResizable: true,
  },
  {
    key: "likes",
    name: "Likes",
    fieldName: "likes",
    className: classNames.likes,
    minWidth: 40,
    maxWidth: 40,
    isRowHeader: true,
    data: "number",
    isPadded: true,
  },
  {
    key: "dislikes",
    name: "Dislikes",
    fieldName: "dislikes",
    className: classNames.likes,
    minWidth: 40,
    maxWidth: 40,
    isRowHeader: true,
    data: "number",
    isPadded: true,
  },
  {
    key: "ratio",
    name: "Ratio",
    fieldName: "ratio",
    className: classNames.likes,
    minWidth: 40,
    maxWidth: 40,
    isRowHeader: true,
    data: "number",
    isPadded: true,
  },
  {
    key: "difficulty",
    name: "Difficulty",
    fieldName: "difficulty",
    minWidth: 50,
    maxWidth: 50,
    isRowHeader: true,
    data: "string",
    isPadded: true,
  },
];

const DROPDOWN_OPTIONS: IDropdownOption[] = [
  {
    key: "all",
    text: "all",
    selected: true,
  },
  { key: "easy", text: "easy" },
  { key: "medium", text: "medium" },
  { key: "hard", text: "hard" },
];

const Table = (props: ITableProps) => {
  const sortAndCopyItems = useCallback(
    <T extends unknown>(
      givenItems: T[],
      columnKey: string,
      isDescending: boolean = false
    ) => {
      const key = columnKey as keyof T;
      const newItems = givenItems.slice();
      newItems.sort((a: T, b: T) =>
        (isDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1
      );
      return newItems;
    },
    []
  );

  const completeItems = useMemo(() => props.items, [props.items]);
  const [items, setItems] = useState(props.items);
  const [columns, setColumns] = useState(COLUMNS);

  const conlumnClickHandler = useCallback(
    (event: React.MouseEvent<HTMLElement>, column: IColumn) => {
      const newColumns = columns.slice();
      const clickedNewColumn = newColumns.filter((newColumn: IColumn) => {
        return column.key === newColumn.key;
      })[0];

      if (!clickedNewColumn.isSorted) {
        clickedNewColumn.isSorted = true;
        clickedNewColumn.isSortedDescending = false;
        newColumns.forEach((newColumn: IColumn) => {
          if (!(column.key === newColumn.key)) newColumn.isSorted = false;
        });
      } else {
        clickedNewColumn.isSortedDescending =
          !clickedNewColumn.isSortedDescending;
      }
      const newItems = sortAndCopyItems(
        items.slice(),
        clickedNewColumn.key,
        clickedNewColumn.isSortedDescending
      );
      setItems(newItems);
      setColumns(newColumns);
    },
    [columns, items, sortAndCopyItems]
  );

  const difficultyFilterChangeHandler = useCallback(
    (
      event: React.FormEvent<HTMLDivElement>,
      option?: IDropdownOption,
      index?: number
    ) => {
      if (!option) return;
      const newItems =
        option.key === "all"
          ? completeItems.slice()
          : completeItems.filter(
              (item: IProblemItem) => option.key === item.difficulty
            );
      const currentSortedColumn = columns.filter(
        (column: IColumn) => column.isSorted
      )[0];
      setItems(sortAndCopyItems(
        newItems,
        currentSortedColumn.key,
        currentSortedColumn.isSortedDescending
      ));
    },
    [completeItems, sortAndCopyItems, columns]
  );

  useEffect(() => {
    setItems(sortAndCopyItems(props.items, "id"));
  }, [props.items, sortAndCopyItems]);

  columns.forEach((column: IColumn) => {
    column.onColumnClick = conlumnClickHandler;
  });

  return (
    <>
      <Dropdown
        placeholder="Select an option"
        label="Difficulty filter"
        options={DROPDOWN_OPTIONS}
        onChange={difficultyFilterChangeHandler}
        style={{ width: 100 }}
      />
      <ShimmeredDetailsList
        columns={columns}
        items={items}
        selectionMode={SelectionMode.none}
        enableShimmer={props.loading}
      />
    </>
  );
};

export default Table;
