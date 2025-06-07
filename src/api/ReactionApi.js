import { TEAM } from "../constants/constants";
// import { BASE_URL } from "../constants/env";
const BASE_URL = `https://rolling-api.vercel.app`;

/** 객체형태로 get과 post를 ReactionsApi에 넣음. 사용할 땐 
 ReactionsApi.get  또는  ReactionsApi.post  로 사용 */
const ReactionsApi = {
  get: async ({ team = TEAM, id, limit, offset }) => {
    try {
      const res = await fetch(
        `${BASE_URL}/${team}/recipients/${id}/reactions/?limit=${limit}&offset=${offset}`
      );

      if (!res.ok) {
        throw new Error(`Reaction get 실패: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error("getReactions 오류:", error);
      throw error;
    }
  },

  post: async ({ team = TEAM, id, emoji, type }) => {
    try {
      const res = await fetch(
        `${BASE_URL}/${team}/recipients/${id}/reactions/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emoji, type }),
        }
      );

      if (!res.ok) {
        throw new Error(`Reaction post 실패: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error("postReactions 오류:", error);
      throw error;
    }
  },
};

export default ReactionsApi;
