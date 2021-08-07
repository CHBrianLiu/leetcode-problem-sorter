import { useState, useEffect, useCallback } from "react";
import Table, { IProblemItem } from "./Table";
import { readString } from "react-papaparse";

interface StatItem {
  id: string;
  title: string;
  title_slug: string;
  difficulty: string;
  likes: number;
  dislikes: number;
  ratio: number;
}

const ProblemList = () => {
  const [loading, setLoading] = useState(true);
  const [csvData, setCsvData] = useState([] as IProblemItem[]);

  const loadCsv = useCallback(async () => {
    const content = await (
      await fetch(
        "https://raw.githubusercontent.com/CHBrianLiu/leetcode-problem-sorter/web/static/list.csv"
      )
    ).text();
    const csv = readString(content, { header: true });
    return csv.data.slice(0, csv.data.length - 1) as StatItem[];
  }, []);

  const transformData = useCallback((record: StatItem): IProblemItem => {
    return {
      id: Number(record.id),
      title: record.title,
      uri: `/problems/${record.title_slug}`,
      likes: Number(record.likes),
      dislikes: Number(record.dislikes),
      ratio: record.dislikes
        ? Number((record.likes / record.dislikes).toPrecision(2))
        : 999,
      difficulty: record.difficulty,
      isPaidOnly: false,
    };
  }, []);

  useEffect(() => {
    (async () => {
      const loadedItems = await loadCsv();
      const items = loadedItems.map(transformData);
      setCsvData(items);
      setLoading(false);
    })();
  }, [transformData, loadCsv]);

  return <Table loading={loading} items={csvData} />;
};

export default ProblemList;
