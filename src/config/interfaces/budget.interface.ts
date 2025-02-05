export interface Budget {
  id: number;
  accountId: number;
  name: string;
  amount: number;
  category: number;
  status: "active" | "inactive";
  type: "expense" | "income";
}
