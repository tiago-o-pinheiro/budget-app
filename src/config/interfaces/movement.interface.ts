export type Frequency = "daily" | "weekly" | "monthly" | "yearly";

export interface Movement {
  account?: string;
  accountId?: number;
  category: number;
  date: string;
  description?: string;
  frequency?: Frequency | null | undefined;
  id: number;
  name: string;
  value: number;
}
