import useSWR from "swr";
import axios from "axios";
import { useMemo, useState } from "react";

import AnimatedBox from "../components/AnimatedBox";
import AnimatedCheckBox from "../components/AnimatedCheckbox";
import Button from "../components/Button";
import Confetti from "../components/Confetti";
import TrollFace from "../components/TrollFace";
import Sayings from "../components/Sayings";

/* Import data */
import strings from "../data/strings";

/* Import types */
import type { NextPage } from "next";
import { motion } from "framer-motion";

interface Data {
  name: string;
  risk: number;
  dates: [Date, Date];
}

const Home: NextPage = () => {
  const [currentStrings, setCurrentStrings] = useState([strings[0]]);

  /* Fetch data */
  const fetchDays = async () => await (await axios.get("/api/days")).data;
  const { data, error } = useSWR<Data[]>("/api/days", fetchDays);

  /* Find special day function */
  const findSpecialDay = (d: Data) => {
    const today = new Date();

    return d.dates.some((date) => {
      return new Date(date).getTime() < today.getTime();
    });
  };

  /* Memos */
  const isAnimationDone = useMemo(
    () => currentStrings.length > strings.length,
    [currentStrings.length]
  );

  const isCuma = useMemo(() => {
    const day = new Date().toLocaleDateString("tr-TR", {
      weekday: "long",
    });

    return day === "Cuma";
  }, []);

  const isTodaySpecial = useMemo(() => {
    if (isCuma) return true;
    else if (isAnimationDone && data) return data?.some(findSpecialDay);
    else return false;
  }, [data, isAnimationDone, isCuma]);

  const getSpecialDay = useMemo(() => {
    if (isCuma)
      return {
        name: "Cuma",
        dates: [new Date()],
        risk: 2,
      };
    else if (isAnimationDone && data && isTodaySpecial)
      return data?.find(findSpecialDay);
    else return null;
  }, [data, isAnimationDone, isTodaySpecial, isCuma]);

  const daysLeft = useMemo(() => {
    if (isTodaySpecial && !isCuma) {
      const specialDay = getSpecialDay || { dates: [0, 0] };

      const today = new Date().getTime();
      const end = new Date(specialDay.dates[1]).getTime();

      return Math.round((end - today) / (1000 * 60 * 60 * 24));
    } else return 0;
  }, [isTodaySpecial, getSpecialDay, isCuma]);

  /* Render */
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
              {!isTodaySpecial && <Confetti />}

              <AnimatedBox>
                <div
                  className={`
            text-white rounded-lg flex flex-col p-4 space-y-2
              ${
                isTodaySpecial
                  ? getSpecialDay?.risk === 2
                    ? "bg-red-700 "
                    : "bg-red-500"
                  : "bg-green-500"
              }
            `}
                >
                  <h3
                    className={`text-sm  uppercase ${
                      isTodaySpecial ? "text-red-300" : "text-green-300"
                    }`}
                    lang="tr"
                  >
                    {isTodaySpecial ? (
                      <>
                        Cehennem riski:{" "}
                        <span className="font-semibold">
                          {getSpecialDay?.risk === 2 ? "Çok Yüksek" : "Yüksek"}
                        </span>
                      </>
                    ) : (
                      <>Çekilir mi?</>
                    )}
                  </h3>

                  <div className="space-y-px">
                    <h1 className="text-4xl font-bold text-white">
                      {!isTodaySpecial ? "Çekilir." : "Çekemezsin!"}
                    </h1>

                    <p className="text-white text-opacity-75">
                      {isTodaySpecial && getSpecialDay && (
                        <div>
                          Bugün günlerden {getSpecialDay.name}! Bugün
                          çekemezsin.
                        </div>
                      )}
                    </p>
                  </div>

                  {isTodaySpecial ? (
                    <p className="text-sm text-white text-opacity-50">
                      Merak etme, bu yasak {daysLeft === 0 ? "1" : daysLeft} gün
                      içinde bitecek.
                    </p>
                  ) : (
                    <div>Bugün seni kimse durduramaz.</div>
                  )}
                </div>
              </AnimatedBox>
            </>
          )}
        </div>

        <motion.div
          initial={{ x: "-30%" }}
          animate={{ x: 0 }}
          className="flex items-center space-x-2"
        >
          <div
            className="px-4 py-2 text-gray-400 rounded-lg bg-gray-50"
            title="Oynatılacak müziğe dikkat edin."
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            </svg>
          </div>

          {isAnimationDone && (
            <>
              <Button href="https://eggsy.xyz/donate" target="_blank">
                Projeyi Destekle
              </Button>

              <Button
                href="https://github.com/eggsy/bu-saatte-cekilir-mi"
                target="_blank"
              >
                GitHub
              </Button>
            </>
          )}
        </motion.div>
      </div>

      {isAnimationDone && (!isTodaySpecial ? <TrollFace /> : <Sayings />)}
    </div>
  );
};

export default Home;