import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useDashboard = () => {
  const [summary, setSummary] = useState({});
  const [guilds, setGuilds] = useState({});
  const [size, setSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
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

  const getSummary = async () => {
    try {
      const { data } = await axios.get(
        "https://gamic.app/api/dashboard/summary"
      );
      setSummary(data.result);
    } catch (error) {
      toast.error(error?.response?.data || error.message);
    }
  };

  const getGuilds = async () => {
    try {
      const { data } = await axios.get(
        `https://gamic.app/api/dashboard/guilds?current=${currentPage}&size=${size}`
      );
      setGuilds(data?.result?.records);
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
    setCurrentPage,
    currentPage,
    setSize,
    size,
    getUserKey,
    getGuildKey,
    userState,
    setUserState,
    guildState,
    setGuildState,
  };
};
