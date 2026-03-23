import { OrgDomain, DomainEntry, DomainOverviewResponse } from "@/types/domain";
import api from "../axios";

export async function getDomainOverview(
  limit: number,
  offset: number,
): Promise<DomainOverviewResponse> {
  const response = await api.get<DomainOverviewResponse>(
    `/domains?limit=${limit}&offset=${offset}`,
  );
  return response.data;
}


export const listOrgDomains = async (): Promise<OrgDomain[]> => {
  const response = await api.get("/domains");
  return response.data.data;
};