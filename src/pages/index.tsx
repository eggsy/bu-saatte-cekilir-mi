import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import useSWR from "swr";
import axios from "axios";

// Functions
import getMessages from "../functions/getMessages";

// Components
import AnimatedBox from "../components/AnimatedBox";
import AnimatedCheckBox from "../components/AnimatedCheckbox";
import Button from "../components/Button/Default";
import SoundButton from "../components/Button/Sound";
import Confetti from "../components/Confetti";
import TrollFace from "../components/TrollFace";
import Sayings from "../components/Sayings";

// Data
import strings from "../data/strings";

// Types
import type { NextPage } from "next";
import type { BayramResponse } from "../functions/checkers/isBayram";

// Function
const Home: NextPage = () => {
  const [currentStrings, setCurrentStrings] = useState([strings[0]]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [getData, setGetData] = useState<{
    name?: string;
    risk?: number;
    message?: string;
  }>({});

  // Fetch data
  const fetchDays = async () => await (await axios.get("/api/days")).data;
  const { data, error } = useSWR<BayramResponse[]>("/api/days", fetchDays);

  // Memos
  const isAnimationDone = useMemo(
    () => currentStrings.length > strings.length,
    [currentStrings.length]
  );

  // Get messages
  const setData = useCallback(() => {
    if (!data) return;

    const message = getMessages(data);
    const isSpecial = message.risk;

    setGetData({
      ...message,
      name: isSpecial ? "Çekilmez!" : "Çekilir.",
    });
  }, [data]);

  useEffect(() => setData(), [setData]);

  // Render
  return (
    <div className="grid min-h-screen gap-6 py-8 md:grid-cols-2">
      <div className="flex flex-col justify-between space-y-4">
        <div className="space-y-8">
          <h1 className="text-4xl font-medium">Bu Saatte Çekilir Mi?</h1>

          <div className="space-y-2">
            {currentStrings.map(
              (string, index) =>
                string && (
                  <div key={index} className="flex items-center space-x-2">
                    <AnimatedCheckBox />

                    <AnimatedBox
                      className={
                        currentStrings.length > index + 1 ? "line-through" : ""
                      }
                      onAnimationComplete={() =>
                        currentStrings.length <= strings.length &&
                        setCurrentStrings([
                          ...currentStrings,
                          strings[index + 1],
                        ])
                      }
                    >
                      {string}
                    </AnimatedBox>
                  </div>
                )
            )}
          </div>

          {isAnimationDone && !error && (
            <>
              {getData?.risk === 0 && <Confetti />}

              <AnimatedBox>
                <div
                  className={`
            text-white rounded-lg flex flex-col p-4 space-y-2
              ${
                getData?.risk
                  ? getData?.risk === 2
                    ? "bg-red-700 "
                    : "bg-red-500"
                  : "bg-green-500"
              }
            `}
                >
                  <h3
                    className={`text-sm  uppercase ${
                      getData?.risk ? "text-red-300" : "text-green-300"
                    }`}
                    lang="tr"
                  >
                    {getData?.risk ? (
                      <>
                        Cehennem riski:{" "}
                        <span className="font-semibold">
                          {getData?.risk === 2 ? "Çok Yüksek" : "Yüksek"}
                        </span>
                      </>
                    ) : (
                      <>Çekilir mi?</>
                    )}
                  </h3>

                  <div className="space-y-1">
                    <h1 className="text-4xl font-bold text-white">
                      {getData.name}
                    </h1>

                    <p className="text-white">{getData.message}</p>
                  </div>
                </div>
              </AnimatedBox>
            </>
          )}
        </div>

        <motion.div
          initial={{ x: "-30%" }}
          animate={{ x: 0 }}
          className="flex flex-wrap items-center gap-2"
        >
          <SoundButton
            soundEnabled={soundEnabled}
            onClick={() => setSoundEnabled((prev) => !prev)}
          />

          {isAnimationDone && (
            <>
              <Button target="_blank" onClick={() => setData()}>
                Mesajı Değiştir
              </Button>

              <Button
                href="https://github.com/eggsy/bu-saatte-cekilir-mi#destek-ol"
                target="_blank"
              >
                Destekle
              </Button>
            </>
          )}
        </motion.div>
      </div>

      {isAnimationDone &&
        (!getData?.risk ? (
          <TrollFace soundEnabled={soundEnabled} />
        ) : (
          <Sayings soundEnabled={soundEnabled} />
        ))}
    </div>
  );
};

export default Home;
