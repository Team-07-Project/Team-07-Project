/**
 * - “삭제 테스트18”부터 시작해서 100개(=18~117) POST 요청을 보냅니다.
 * 테스트용 데이터 넣는 배치파일입니다.
 * 지울 예정입니다.
 */

const TEAM = "16-7";
const RECIPIENT_ID = 11725;
const START_INDEX = 9;
const TOTAL = 100;

async function postBatchWithFetch() {
  for (let i = 0; i < TOTAL; i++) {
    const currentIndex = START_INDEX + i; // 18~117
    const senderName = `삭제 테스트${currentIndex}`;

    const payload = {
      team: TEAM,
      recipientId: RECIPIENT_ID,
      sender: senderName,
      profileImageURL:
        "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvcGR2YW5nb2doLXNlbGYtcG9ydHJhaXQtbTAxLWpvYjY2MV8yLWwxMDBvNmVmLmpwZw.jpg",
      relationship: "동료",
      content: "나눔손글씨 손편지체 폰트 설정함.",
      font: "나눔손글씨 손편지체",
    };

    const url = `https://rolling-api.vercel.app/${TEAM}/recipients/${RECIPIENT_ID}/messages/`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error(
          `[${i + 1}/${TOTAL}] POST 실패: ${res.status} ${
            res.statusText
          }\n${errText}`
        );
      } else {
        const data = await res.json();
        console.log(`[${i + 1}/${TOTAL}] POST 성공:`, data);
      }
    } catch (err) {
      console.error(`[${i + 1}/${TOTAL}] 네트워크 오류:`, err.message);
    }

    // (선택) 서버 과부하 방지를 위해 잠시 딜레이를 줄 수 있습니다
    await new Promise((r) => setTimeout(r, 200));
  }

  console.log("모든 POST 요청 완료!");
}

// 실행
postBatchWithFetch();
