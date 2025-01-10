export type Frequency = "daily" | "weekly" | "monthly" | "yearly";

export interface Movement {
  id: number;
  name: string;
  description?: string;
  value: number;
  date: string;
  frequency?: Frequency | null | undefined;
  category: string;
}
