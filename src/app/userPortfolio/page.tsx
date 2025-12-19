"use client";
import { userBalance } from "@/components/service/apiService/user";
import FundingHeader from "@/components/userComponents/FundingHeader";
import FundingRounds from "@/components/userComponents/FundingRounds";
import FundingStats from "@/components/userComponents/FundingStats";
import InvestorsList from "@/components/userComponents/InvestorsList";
import { useEffect, useState } from "react";

export default function userPortfolio() {
  const [balance, setBalance] = useState({});
  const getUserBalance = async () => {
    try {
      const response = await userBalance();
      if (response?.success) {
        setBalance(response?.data);
      } else {
        setBalance({});
      }
      console.log(response, "response");
    } catch (error: any) {
      setBalance({});
      console.log(error, "error");
    }
  };
  useEffect(() => {
    getUserBalance();
  }, []);
  return (
    <main className="min-h-screen mt-40  container mx-auto bg-white text-slate-800 px-32 py-8">
      <FundingHeader />
      <FundingStats balance={balance} />
      <FundingRounds balance={balance} />
      <InvestorsList />
    </main>
  );
}
