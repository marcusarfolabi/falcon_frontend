import { OrgOverviewResponse } from "@/types/organization";
import api from "../axios";

export async function getOrgOverview(): Promise<OrgOverviewResponse> {
  const response = await api.get<OrgOverviewResponse>(
    "/organization"
  );
  return response.data;
}
