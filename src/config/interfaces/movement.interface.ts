export interface Movement {
  id: number;
  name: string;
  description?: string;
  value: number;
  date: string;
  isRecurrent?: boolean;
  category: string;
}
