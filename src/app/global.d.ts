import {
  Review as rv,
  Professor as pf,
  School as sc,
} from "@/utils/types/types";

declare global {
  type Review = rv;
  type Professor = pf;
  type School = sc;
}
