import { OrgDomain, DomainEntry, DomainOverviewResponse } from "@/types/domain";
import api from "../axios";

export async function getDomainOverview(
  limit: number,
  offset: number,
): Promise<DomainOverviewResponse> {
  const response = await api.get<DomainOverviewResponse>(
    `/api/v1/account-domains?limit=${limit}&offset=${offset}`,
  );
  return response.data;
}


export const listOrgDomains = async (): Promise<OrgDomain[]> => {
  const response = await api.get("/api/v1/list-org-domains");
  return response.data.data;
};