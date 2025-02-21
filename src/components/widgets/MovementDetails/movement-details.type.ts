import { Frequency } from "src/config/interfaces/movement.interface";

export type AdditionalSettings = {
  description?: string;
  frequency?: Frequency | null;
  date?: string;
};
