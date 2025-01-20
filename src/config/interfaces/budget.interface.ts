export interface Budget {
  id: number;
  accountId: number;
  name: string;
  amount: number;
  category: string;
  status: "active" | "inactive";
  type: "expense" | "income";
}
