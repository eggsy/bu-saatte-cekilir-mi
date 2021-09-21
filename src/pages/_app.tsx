import { useState } from "react";
import Head from "next/head";
import Interact from "../components/Home/Interact";

/* Import CSS */
import "tailwindcss/tailwind.css";

/* Import types */
import type { AppProps } from "next/app";

const BuSaatteCekilirMi = ({ Component, pageProps }: AppProps) => {
  const [interacted, setInteracted] = useState(false);

  return (
    <>
      <Head>
        <title>Bu Saatte Çekilir Mi?</title>
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
