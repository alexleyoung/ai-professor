import { Review as rv, Professor as pf } from "@/utils/types/types";

declare global {
  type Review = rv;
  type Professor = pf;
}
