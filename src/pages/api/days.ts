import axios, { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

/* Import types */
import type { GoogleResponse } from "../../../@types/GoogleResponse";

/* Set constant data */
const veryRiskyDates = ["Ramazan Bayram", "Kurban Bayram"];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const API_KEY = process.env.GOOGLE_API_KEY;

  const { data }: AxiosResponse<GoogleResponse> = await axios.get(
    `https://www.googleapis.com/calendar/v3/calendars/turkish__tr%40holiday.calendar.google.com/events?key=${API_KEY}`
  );

  const filtered = data?.items?.filter((item) =>
    item.description?.toLowerCase()?.includes("resmi tatil")
  );

  const items = filtered
    ?.filter(
      (item) => new Date(item.start.date)?.getTime() > new Date().getTime()
    )
    ?.map((item) => ({
      name: item.summary,
      risk: veryRiskyDates.some((i) => item.summary.includes(i)) ? 2 : 1,
      dates: [new Date(item.start.date), new Date(item.end.date)],
    }))
    ?.sort((a, b) => a.dates[0].getTime() - b.dates[0].getTime());

  // Bayram günü sitenin ne tepki vereceğini merak ediyorsanız bu kısmı

  /* items.push({
    name: "Bayram",
    risk: 2,
    dates: [new Date()],
  }); */

  res.status(200).json(items);
}
