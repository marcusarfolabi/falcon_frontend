import api from "../axios";
import { MailboxInventory, MailboxOverviewResponse } from "@/types/mailbox";
const FORM_HEADER = { "Content-Type": "application/x-www-form-urlencoded" };

export interface CreateMailboxPayload {
  display_name: string;
  email: string;
  domain_id: string | number;
  password: string;
  alternative_email?: string;
}

export interface CreateMailboxResponse {
  status: "success";
  message: string;
  data: MailboxInventory;
}

export async function getMailboxOverview(
  limit: number,
  offset: number,
): Promise<MailboxOverviewResponse> {
  const response = await api.get<MailboxOverviewResponse>(
    `/mailboxes?limit=${limit}&offset=${offset}`,
  );
  return response.data;
}

// export async function addMailBox(
//   payload: CreateMailboxPayload,
// ): Promise<CreateMailboxResponse> {
//   const response = await api.post<CreateMailboxResponse>(
//     "/mailboxes/add",
//     payload,
//     {
//       headers: FORM_HEADER,
//     },
//   );
//   return response.data;
// }

export const addMailBox = async (data: CreateMailboxPayload) => {
  return await api.post("/mailboxes/add", data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};