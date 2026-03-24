import { OrgDomain, DomainEntry, DomainOverviewResponse } from "@/types/domain";
import api from "../axios";
const FORM_HEADER = { "Content-Type": "application/x-www-form-urlencoded" };

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
  return response.data;
};

export async function addDomain(domainName: string): Promise<{
  success: boolean;
  message: string;
}> {
  const response = await api.post(
    "/domains/check-domain",
    {
      domain_name: domainName,
    },
    {
      headers: FORM_HEADER,
    },
  );

  return response.data;
}
