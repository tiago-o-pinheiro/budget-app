import { Movement } from "./movement.interface";

export interface Account {
  id: string;
  name: string;
  owner?: string;
  balance: number;
  description?: string;
  iban?: string;
  swift?: string;
  movements?: Movement[];
}
