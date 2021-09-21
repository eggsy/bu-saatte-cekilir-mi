export interface GoogleResponse {
  kind: string;
  etag: string;
  summary: string;
  updated: string;
  timeZone: string;
  accessRole: string;
  defaultReminders: any[];
  nextSyncToken: string;
  items: Item[];
}

interface Item {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  description: string;
  creator: Creator;
  organizer: Creator;
  start: Start;
  end: Start;
  transparency: string;
  visibility: string;
  iCalUID: string;
  sequence: number;
  eventType: string;
}

interface Start {
  date: string;
}

interface Creator {
  email: string;
  displayName: string;
  self: boolean;
}
