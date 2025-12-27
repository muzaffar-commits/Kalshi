export default function MarketLeaderboard({ data }: { data: any }) {
  return (
    <div className="w-full  rounded-2xl border border-white/10 p-5 ">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold tracking-wide text-white">
          🏆 Market Leaderboard
        </h2>
        <span className="text-xs text-slate-400">Live Ranking</span>
      </div>

      <div className="grid grid-cols-4 text-xs text-slate-400 px-3 py-2">
        <span>Rank</span>
        <span>User</span>
        <span className="text-right">Profit</span>
        <span className="text-right">ROI</span>
      </div>

      <div className="space-y-2">
        {data.map((item: any, index: any) => (
          <div
            key={index}
            className={`grid grid-cols-4 items-center px-3 py-3 rounded-xl
              border border-white/5
              ${
                item.rank === 1
                  ? "bg-gradient-to-r from-amber-500/20 to-transparent shadow-[0_0_25px_rgba(245,158,11,0.25)]"
                  : "bg-white/5 hover:bg-white/10"
              }
              transition`}
          >
            {/* Rank */}
            <div className="flex items-center gap-2">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold
                  ${
                    item.rank === 1
                      ? "bg-amber-400 text-black"
                      : "bg-slate-700 text-white"
                  }`}
              >
                {item.rank}
              </span>
            </div>

            {/* Username */}
            <div className="text-sm text-white font-medium truncate">
              {item.username}
            </div>

            {/* Profit */}
            <div className="text-right text-sm font-semibold text-emerald-400">
              ₹{item.profit.toFixed(2)}
            </div>

            {/* ROI */}
            <div className="text-right text-xs font-semibold text-sky-400">
              {item.roi.toFixed(2)}%
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 text-center text-[11px] text-slate-500">
        Rankings based on profit & ROI
      </div>
    </div>
  );
}
