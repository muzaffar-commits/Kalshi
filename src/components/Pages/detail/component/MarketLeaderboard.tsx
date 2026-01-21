type LeaderboardItem = {
  rank: number;
  username: string;
  profit: number;
  roi: number;
};

interface MarketLeaderboardProps {
  data: LeaderboardItem[];
}
export default function MarketLeaderboard({ data }: MarketLeaderboardProps) {
  return (
    <div className="w-full  rounded-2xl border dark:border-gray-800 border-gray-200 p-5 ">
      <div className="flex items-center justify-between mb-4">
        <h2 className="md:text-xl font-semibold tracking-wide text-black/80 dark:text-white">
          Market Leaderboard
        </h2>
        <span className="text-xs text-slate-400">Live Ranking</span>
      </div>

      <div className="grid grid-cols-4 text-[14px] font-semibold text-black/80 dark:text-white/90  px-3 py-2">
        <span>Rank</span>
        <span>User</span>
        <span>Profit</span>
        <span className="text-right">ROI</span>
      </div>

      <div className="space-y-2">
        {data.map((item: LeaderboardItem, index: number) => (
          <div
            key={index}
            className={`grid grid-cols-4 items-center px-3 py-3 rounded-md
              border dark:border-gray-800 border-gray-200
              ${item.rank === 1 ? "" : "bg-white/2 hover:bg-white/10"}
              transition`}
          >
            {/* Rank */}
            <div className="flex items-center gap-2">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold
                  ${
                    item.rank === 1
                      ? "bg-[#c3a66e] text-white"
                      : "bg-slate-700 text-white"
                  }`}
              >
                {item.rank}
              </span>
            </div>

            {/* Username */}
            <div className="text-sm text-[#c3a66e] font-medium truncate">
              {item.username}
            </div>

            {/* Profit */}
            <div className="text-sm font-semibold text-emerald-400">
              $ {item.profit.toFixed(2)}
            </div>

            {/* ROI */}
            <div className="text-right text-xs font-semibold text-gray-600 dark:text-gray-300">
              {item.roi.toFixed(2)}%
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 text-center text-[11px] text-black/80 dark:text-gray-400">
        Rankings based on profit & ROI
      </div>
    </div>
  );
}
