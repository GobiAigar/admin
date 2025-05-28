"use client";

import { Backend_Endpoint } from "@/constants/constants";
import { useEffect, useState } from "react";

const Page = () => {
  const [datas, setDatas] = useState([]);
  const fetchStatistic = async () => {
    try {
      const response = await fetch(`${Backend_Endpoint}/api/statistics`);
      const data = await response.json();
      setDatas(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStatistic();
  }, []);
  return <div>Page</div>;
};

export default Page;
