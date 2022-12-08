import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useDashboard = () => {
  const [summary, setSummary] = useState({});
  const [guilds, setGuilds] = useState({});
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [userState, setUserState] = useState("daily");
  const [guildState, setGuildState] = useState("daily");

  const getUserKey = () => {
    switch (userState) {
      case "daily":
        return { key: "dailyUserCount" };

      case "weekly":
        return { key: "weeklyUserCount" };

      case "monthly":
        return { key: "monthlyUserCount" };

      default:
        return null;
    }
  };

  const getGuildKey = () => {
    switch (guildState) {
      case "daily":
        return { key: "dailyGuildCount" };

      case "weekly":
        return { key: "weeklyGuildCount" };

      case "monthly":
        return { key: "monthlyGuildCount" };

      default:
        return null;
    }
  };

  const getGuildType = (type) => {
    switch (type) {
      case 0:
        return "Game Guild";

      case 1:
        return "Community Build";

      default:
        return "None";
    }
  };

  const onNextPageClick = () => {
    if (currentPage === pages) return;
    setCurrentPage(currentPage + 1);
  };

  const onPrevPageClick = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  const onPageClick = (page) => {
    setCurrentPage(page);
  };


  const getMinMaxPage = () => {
    let maxPage = 5;
    let minPage = 0;
    const nextPages = currentPage + 5;

    if (currentPage > maxPage || currentPage < minPage) {
      minPage = currentPage - 1;
      maxPage = nextPages > pages ? pages : nextPages;
    }

    return [minPage, maxPage];
  };

  const [minPage, maxPage] = getMinMaxPage();

  const getSummary = async () => {
    try {
      const { data } = await axios.get("/summary");
      setSummary(data.result);
    } catch (error) {
      toast.error(error?.response?.data || error.message);
    }
  };

  const getGuilds = async () => {
    try {
      const { data } = await axios.get(
        `/guilds?current=${currentPage}&size=${size}`
      );
      setGuilds(data?.result?.records);
      setTotal(data?.result?.total || 0);
      setCurrentPage(data?.result?.current || 1);
      setPages(data?.result?.pages || 1);
    } catch (error) {
      toast.error(error?.response?.data || error.message);
    }
  };

  useEffect(() => {
    getSummary();
  }, []);

  useEffect(() => {
    getGuilds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, size]);

  return {
    summary,
    guilds,
    currentPage,
    setSize,
    size,
    getUserKey,
    getGuildKey,
    userState,
    setUserState,
    guildState,
    setGuildState,
    getGuildType,
    total,
    pages,
    onNextPageClick,
    onPrevPageClick,
    onPageClick,
    minPage,
    maxPage,
  };
};
