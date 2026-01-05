import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Image from 'next/image';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ProfileTabs() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "#495964" }}>
        <Tabs
          value={value}
          onChange={(_, v) => setValue(v)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            "& .MuiTab-root": {
              color: "#838383",
              textTransform: "none",
              fontSize: { xs: "12px", sm: "14px" },
              minWidth: "auto",
              px: 2,
            },
            "& .Mui-selected": {
              color: "#0099ff",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#0099ff",
            },
          }}
        >
          <Tab label="Portfolio" {...a11yProps(0)} />
          <Tab label="Top Categories" {...a11yProps(1)} />
          <Tab label="Posts" {...a11yProps(2)} />
          <Tab label="Market Builder" {...a11yProps(3)} />
        </Tabs>
      </Box>

      {/* Portfolio */}
      <CustomTabPanel value={value} index={0}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-b border-gray-800 pb-3">
          {[
            ["Invested", "$2,450", "text-white"],
            ["Current Value", "$2,890", "text-green-400"],
            ["P/L", "+$440", "text-green-400"],
            ["Active Bets", "12", "text-white"],
          ].map(([label, val, color], i) => (
            <div key={i} className="bg-[#0f172a] p-3 rounded-lg">
              <p className="text-xs text-gray-400">{label}</p>
              <p className={`text-lg font-semibold ${color}`}>{val}</p>
            </div>
          ))}
        </div>
      </CustomTabPanel>

      {/* Top Categories */}
      <CustomTabPanel value={value} index={1}>
        {[
          ["Sports", "$1,760"],
          ["Entertainment", "$0.00"],
        ].map(([name, amt], i) => (
          <div
            key={i}
            className="flex flex-wrap sm:flex-nowrap items-center gap-3 border-b border-gray-800 py-3"
          >
            <Image
              src="/img/nick.jpg"
              alt="cat"
              width={42}
              height={42}
              className="rounded-md"
            />
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">{name}</p>
            </div>
            <span className="bg-green-700 text-white px-4 py-1 text-sm rounded w-full sm:w-auto text-center">
              {amt}
            </span>
          </div>
        ))}
      </CustomTabPanel>

      {/* Posts */}
      <CustomTabPanel value={value} index={2}>
        <div className="bg-[#0f172a] border border-gray-800 rounded-lg p-3 flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-3 flex-1">
            <Image
              src="/img/nick.jpg"
              alt="user"
              width={40}
              height={40}
              className="rounded-full"
            />
            <input
              placeholder="What's your prediction today?"
              className="flex-1 bg-transparent outline-none text-sm text-white placeholder-gray-400"
            />
          </div>
          <button className="bg-[#0099ff] text-white px-4 py-2 rounded w-full sm:w-auto">
            Post
          </button>
        </div>
      </CustomTabPanel>

      {/* Market Builder */}
      <CustomTabPanel value={value} index={3}>
        <div className="bg-[#0f172a] border border-gray-800 rounded-lg p-5">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
            Create Your Own Prediction Market
          </h3>
          <p className="text-sm text-gray-400">
            Turn real-world events into tradable markets. Define outcomes and let
            the community decide.
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {["Create Markets", "Earn Fees", "Community Driven"].map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full bg-[#0099ff]/10 text-[#0099ff]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </CustomTabPanel>
    </Box>

  );
}
