import { BASE_URL } from "../../constants/env";
import { TEAM, CARDINAL_NUMBER } from "../../constants/constants";

const RECIPIENTS = "recipients";
const MESSAGES = "messages";

const createMessage = async ({ recipientId, data }) => {
  const url = `https://rolling-api.vercel.app/${CARDINAL_NUMBER}-${TEAM}/${RECIPIENTS}/${recipientId}/${MESSAGES}/`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("서버 에러 메시지:", errorBody);
    throw new Error("메시지 작성에 실패했어요. 😥");
  }

  const resData = await res.json();

  return resData;
};

export default createMessage;
