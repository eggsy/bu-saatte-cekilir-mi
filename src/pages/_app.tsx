import { useState } from "react";
import Head from "next/head";
import Interact from "../components/Home/Interact";

/* Import CSS */
import "tailwindcss/tailwind.css";

/* Import types */
import type { AppProps } from "next/app";

/* Meta information */
const meta = {
  title: "Bu Saatte Çekilir Mi?",
  description:
    "Hangi günde olduğunu bilmeyen, çekip çekemeyeceğine emin olmak ve günah riskine girmek istemeyenler için geliştirilmiş internet uygulaması.",
};

const BuSaatteCekilirMi = ({ Component, pageProps }: AppProps) => {
  const [interacted, setInteracted] = useState(false);

  return (
    <>
      <Head>
        <title>{meta.title}</title>

        <meta
          name="description"
          property="description"
          content={meta.description}
        />

        {/* Open-graph */}
        <meta name="og:title" property="og:title" content={meta.title} />
        <meta
          name="og:description"
          property="og:description"
          content={meta.description}
        />
        <meta name="og:color" property="og:color" content="#EF4444" />

        {/* Twitter */}
        <meta
          name="twitter:title"
          property="twitter:title"
          content={meta.title}
        />
        <meta
          name="twitter:description"
          property="twitter:description"
          content={meta.description}
        />
      </Head>

      <div className="container min-h-screen px-4 mx-auto overflow-x-hidden">
        {!interacted ? (
          <Interact onClick={() => setInteracted(true)} />
        ) : (
          <Component {...pageProps} />
        )}
      </div>
    </>
  );
};

export default BuSaatteCekilirMi;
