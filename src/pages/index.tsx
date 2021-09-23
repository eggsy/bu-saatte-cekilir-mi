import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import useSWR from "swr";
import axios from "axios";

import AnimatedBox from "../components/AnimatedBox";
import AnimatedCheckBox from "../components/AnimatedCheckbox";
import Button from "../components/Button/Default";
import SoundButton from "../components/Button/Sound";
import Confetti from "../components/Confetti";
import TrollFace from "../components/TrollFace";
import Sayings from "../components/Sayings";

/* Import data */
import strings from "../data/strings";

/* Import types */
import type { NextPage } from "next";

interface Data {
  name: string;
  risk: number;
  dates: [Date, Date];
}

const Home: NextPage = () => {
  const [currentStrings, setCurrentStrings] = useState([strings[0]]);
  const [forceReverseResult, setForceReverseResult] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isHiddenButton, setIsHiddenButton] = useState(0);

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
    const getResult = () => {
      if (isCuma) return true;
      else if (data) return data?.some(findSpecialDay);
      else return false;
    };

    const result = getResult();
    return forceReverseResult ? !result : result;
  }, [data, isCuma, forceReverseResult]);

  const getSpecialDay = useMemo(() => {
    if (isCuma)
      return {
        name: "Cuma",
        dates: [new Date()],
        risk: 2,
      };
    else if (data && isTodaySpecial) return data?.find(findSpecialDay);
    else return null;
  }, [data, isTodaySpecial, isCuma]);

  const daysLeft = useMemo(() => {
    if (isTodaySpecial && !isCuma) {
      const specialDay = getSpecialDay || { dates: [0, 0] };

      const today = new Date().getTime();
      const end = new Date(specialDay.dates[1]).getTime();

      return Math.round((end - today) / (1000 * 60 * 60 * 24));
    } else return 1;
  }, [isTodaySpecial, getSpecialDay, isCuma]);

  const getText = useMemo(() => {
    let title = isTodaySpecial ? "Çekemezsin!" : "Çekilir.",
      description,
      subtitle;

    /* Description */
    if (isTodaySpecial && getSpecialDay)
      description = `Bugün günlerden ${getSpecialDay.name}! Bugün
                          çekemezsin.`;

    /* Subtitle */
    if (isCuma && forceReverseResult) {
      title = "Çekilir de-..";
      subtitle = "Bari bugün çekme be usta...";
    } else if (isTodaySpecial && forceReverseResult)
      subtitle = "Sen öyle diyorsan öyledir usta.";
    else if (isTodaySpecial && !forceReverseResult)
      subtitle = `Merak etme, bu yasak ${
        daysLeft === 0 ? "1" : daysLeft
      } gün içinde bitecek.`;
    else if (new Date().getMinutes() === 31)
      subtitle = "Bundan daha iyi bir zaman olamaz...";
    else subtitle = "Bugün seni kimse durduramaz.";

    return {
      title,
      description,
      subtitle,
    };
  }, [daysLeft, isCuma, forceReverseResult, getSpecialDay, isTodaySpecial]);

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
                      {getText.title}
                    </h1>

                    <p className="text-white text-opacity-75">
                      {getText.description}
                    </p>
                  </div>

                  <p className="text-sm text-white text-opacity-50">
                    {getText.subtitle}
                  </p>
                </div>
              </AnimatedBox>
            </>
          )}
        </div>

        <motion.div
          initial={{ x: "-30%" }}
          animate={{ x: 0 }}
          className="flex flex-wrap items-center gap-2"
          onClick={() => setIsHiddenButton((prev) => prev + 1)}
        >
          <SoundButton
            soundEnabled={soundEnabled}
            onClick={() => setSoundEnabled((prev) => !prev)}
          />

          {isAnimationDone && (
            <>
              <Button
                href="https://github.com/eggsy/bu-saatte-cekilir-mi#destek-ol"
                target="_blank"
              >
                Projeyi Destekle
              </Button>

              <Button
                href="https://github.com/eggsy/bu-saatte-cekilir-mi"
                target="_blank"
              >
                GitHub
              </Button>

              {isHiddenButton > 5 && (
                <Button
                  title="Aksi bir sonucu zorlamak için tıklayın"
                  onClick={() => setForceReverseResult((prev) => !prev)}
                >
                  {isTodaySpecial ? "Çekilir Çekilir" : "Yok Çekilmez"}
                </Button>
              )}
            </>
          )}
        </motion.div>
      </div>

      {isAnimationDone &&
        (!isTodaySpecial ? (
          <TrollFace soundEnabled={soundEnabled} />
        ) : (
          <Sayings soundEnabled={soundEnabled} />
        ))}
    </div>
  );
};

export default Home;
