export const getInbox = async (token: string) => {
  // We use the WHATWG URL API now (no more url.parse warning)
  const url = new URL('https://mail.falconmail.online/jmap');
  
  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      using: ["urn:ietf:params:jmap:core", "urn:ietf:params:jmap:mail"],
      methodCalls: [
        ["Email/query", { filter: { inMailbox: "inbox" }, sort: [{ property: "receivedAt", isAscending: false }], limit: 50 }, "a"],
        ["Email/get", { "#ids": { resultOf: "a", name: "Email/query", path: "/ids" }, properties: ["from", "subject", "receivedAt", "preview"] }, "b"]
      ]
    })
  });
  return response.json();
};