import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useDashboard = () => {
  const [summary, setSummary] = useState({});
  const [guilds, setGuilds] = useState({});
  const [total, setTotal] = useState(10);
  const [spaceParams, setSpaceParams] = useState({
    currentPage: 1,
    size: 10,
  });
  const [onlineActivityParams, setOnlineActivityParams] = useState({
    size: 24,
  });
  const [walletInsightsParams, setWalletInsightsParams] = useState({
    size: 24,
    type: "airdrop",
  });
  const [volumeTrend, setVolumeTrend] = useState([]);
  const [countTrend, setCountTrend] = useState([]);
  const [onlineActivity, setOnlineActivity] = useState({});
  const [pages, setPages] = useState(1);
  const [userState, setUserState] = useState("daily");
  const [guildState, setGuildState] = useState("daily");
  const [loading, setLoading] = useState(false);
  const [walletOverview, setWalletOverview] = useState({
    totalWallets: 0,
    totalTransfers: 0,
    totalSwapped: 0,
    totalAirdrop: 0,
  });
  const [modalPrompt, setModalPrompt] = useState(false);

  const api = process.env.REACT_APP_BACKEND_API;

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
    if (spaceParams.currentPage === pages) return;
    setSpaceParams({
      ...spaceParams,
      currentPage: spaceParams.currentPage + 1,
    });
  };

  const onPrevPageClick = () => {
    if (spaceParams.currentPage === 1) return;
    setSpaceParams({
      ...spaceParams,
      currentPage: spaceParams.currentPage - 1,
    });
  };

  const onPageClick = (page) => {
    setSpaceParams({
      ...spaceParams,
      currentPage: page,
    });
  };

  const getMinMaxPage = () => {
    let maxPage = 5;
    let minPage = 0;
    const nextPages = spaceParams.currentPage + 5;

    if (
      spaceParams.currentPage > maxPage ||
      spaceParams.currentPage < minPage
    ) {
      minPage = spaceParams.currentPage - 1;
      maxPage = nextPages > pages ? pages : nextPages;
    }

    return [minPage, maxPage];
  };

  const [minPage, maxPage] = getMinMaxPage();

  const commaSeperatedNumber = (val) => {
    return (+val).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
  };

  const getSummary = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${api}/dashboard/summary`);
      setSummary(data.result);
    } catch (error) {
      toast.error(error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const getWalletOverview = async () => {
    try {
      setLoading(true);
      const { data: wallet } = await axios.get(`${api}/stats/wallet-count`);
      const { data: airdrop } = await axios.get(`${api}/stats/airdrop-count`);
      const { data: trans } = await axios.get(`${api}/stats/transactions-type`);

      setWalletOverview({
        ...walletOverview,
        totalAirdrop: airdrop[0]?.count,
        totalWallets: wallet[0]?.count,
        totalSwapped: trans?.find((x) => x.transaction_type === 1).count,
        totalTransfers: trans?.find((x) => x.transaction_type === 0).count,
      });
    } catch (error) {
      toast.error(error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const getOnlineActivity = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${api}/stats/online-activity?size=${onlineActivityParams.size}`
      );
      setOnlineActivity(data);
    } catch (error) {
      toast.error(error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const getWalletInsights = async () => {
    try {
      setLoading(true);
      const { data: count } = await axios.get(
        `${api}/stats/${walletInsightsParams.type}-count-trend?size=${walletInsightsParams.size}`
      );
      const { data: volume } = await axios.get(
        `${api}/stats/${walletInsightsParams.type}-volume-trend?size=${walletInsightsParams.size}`
      );
      setCountTrend(count);
      setVolumeTrend(volume);
    } catch (error) {
      toast.error(error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const getGuilds = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${api}/dashboard/guilds?current=${spaceParams.currentPage}&size=${spaceParams.size}`
      );
      setGuilds(data?.result?.records);
      setTotal(data?.result?.total || 0);
      setPages(data?.result?.pages || 1);
    } catch (error) {
      toast.error(error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSummary();
    getWalletOverview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getOnlineActivity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onlineActivityParams]);

  useEffect(() => {
    getWalletInsights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletInsightsParams]);

  useEffect(() => {
    getGuilds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spaceParams]);

  return {
    summary,
    guilds,
    spaceParams,
    setSpaceParams,
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
    loading,
    commaSeperatedNumber,
    modalPrompt,
    setModalPrompt,
    walletOverview,
    onlineActivityParams,
    setOnlineActivityParams,
    onlineActivity,
    walletInsightsParams,
    setWalletInsightsParams,
    countTrend,
    volumeTrend,
  };
};
