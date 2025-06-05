import { css } from "@emotion/react";
import Button from "../../components/Button";
import AddEmojiButton from "../../components/Button/AddEmojiButton";
import Avatar from "../../components/Avatar";
import avatarSampleImg from "../../assets/images/img-avatar-sample.jpg";
import GlobalHeader from "../../components/Header/GlobalHeader";
import ListPageHeader from "../List/ListPageHeader";
import MessageCard from "../../components/MessageCard/MessageCard";
import AddMessageCardButton from "../../components/MessageCard/AddMessageCardButton";
import MessageCardList from "../../components/MessageCard/MessageCardList";
import MessageCardListStyle from "../../components/MessageCard/MessageCardListStyle";
import useToast from "../../components/Toast/useToast";
import useModal from "../../components/Modal/useModal";
import MessageCardModal from "../../components/Modal/MessageCardModal";

const mockMessage = {
  sender: "강미나",
  profileImg: avatarSampleImg,
  relationship: "가족",
  content:
    "코로나가 또다시 기승을 부리는 요즘이네요. 건강, 체력 모두 조심 또 하세요!",
  createdAt: "2025.06.01",
};

const mockMessages = [
  {
    id: 1,
    recipientId: 1,
    sender: "김하은",
    profileImageURL:
      "https://fastly.picsum.photos/id/311/200/200.jpg?hmac=CHiYGYQ3Xpesshw5eYWH7U0Kyl9zMTZLQuRDU4OtyH8",
    relationship: "가족",
    content:
      "열심히 일하는 모습 멋있습니다. 코로나가 또다시 기승을 부리는 요즘이네요. 건강, 체력 모두 조심 또 하세요! 코로나가 또다시 기승을 부리는 요즘이네요. 건강, 체력 모두 조심 또 하세요! 코로나가 또다시 기승을 부리는 요즘이네요. 건강, 체력 모두 조심 또 하세요! 코로나가 또다시 기승을 부리는 요즘이네요. 건강, 체력 모두 조심 또 하세요! 코로나가 또다시 기승을 부리는 요즘이네요. 건강, 체력 모두 조심 또 하세요!",
    font: "Pretendard",
    createdAt: "2023-11-01T08:05:25.399056Z",
  },
  {
    id: 2,
    recipientId: 1,
    sender: "이영준",
    profileImageURL:
      "https://fastly.picsum.photos/id/311/200/200.jpg?hmac=CHiYGYQ3Xpesshw5eYWH7U0Kyl9zMTZLQuRDU4OtyH8",
    relationship: "지인",
    content: "항상 응원합니다",
    font: "Noto Sans KR",
    createdAt: "2023-11-01T08:04:12.852691Z",
  },
  {
    id: 3,
    recipientId: 1,
    sender: "김하은",
    profileImageURL:
      "https://fastly.picsum.photos/id/311/200/200.jpg?hmac=CHiYGYQ3Xpesshw5eYWH7U0Kyl9zMTZLQuRDU4OtyH8",
    relationship: "가족",
    content: "열심히 일하는 모습 멋있습니다.",
    font: "Pretendard",
    createdAt: "2023-11-01T08:05:25.399056Z",
  },
  {
    id: 4,
    recipientId: 1,
    sender: "이영준",
    profileImageURL:
      "https://fastly.picsum.photos/id/311/200/200.jpg?hmac=CHiYGYQ3Xpesshw5eYWH7U0Kyl9zMTZLQuRDU4OtyH8",
    relationship: "지인",
    content: "항상 응원합니다",
    font: "Noto Sans KR",
    createdAt: "2023-11-01T08:04:12.852691Z",
  },
  {
    id: 5,
    recipientId: 1,
    sender: "김하은",
    profileImageURL:
      "https://fastly.picsum.photos/id/311/200/200.jpg?hmac=CHiYGYQ3Xpesshw5eYWH7U0Kyl9zMTZLQuRDU4OtyH8",
    relationship: "가족",
    content: "열심히 일하는 모습 멋있습니다.",
    font: "Pretendard",
    createdAt: "2023-11-01T08:05:25.399056Z",
  },
  {
    id: 6,
    recipientId: 1,
    sender: "이영준",
    profileImageURL:
      "https://fastly.picsum.photos/id/311/200/200.jpg?hmac=CHiYGYQ3Xpesshw5eYWH7U0Kyl9zMTZLQuRDU4OtyH8",
    relationship: "지인",
    content: "항상 응원합니다",
    font: "Noto Sans KR",
    createdAt: "2023-11-01T08:04:12.852691Z",
  },
];

const StyleGuidePage = () => {
  const { showToast } = useToast();
  const { showModal } = useModal();

  return (
    <div css={pageStyle}>
      {/* Buttons */}
      <section css={sectionStyle}>
        <h2 className="section-title">Button</h2>
        <div className="sub-section">
          <h3 className="section-sub-title">Primary</h3>
          <Button size="lg" variant="primary" onClick={() => alert("clicked")}>
            Enabled
          </Button>
          <Button
            size="lg"
            variant="primary"
            disabled
            onClick={() => alert("clicked")}
          >
            Disabled
          </Button>
          <Button size="md" variant="primary" onClick={() => alert("clicked")}>
            Enabled
          </Button>
          <Button
            size="md"
            variant="primary"
            onClick={() => alert("clicked")}
            disabled
          >
            Enabled
          </Button>
          <Button size="sm" variant="primary" onClick={() => alert("clicked")}>
            Enabled
          </Button>
          <Button size="xs" variant="primary" onClick={() => alert("clicked")}>
            Enabled
          </Button>
        </div>
        <div className="sub-section">
          <h3 className="section-sub-title">Secondary</h3>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => alert("clicked")}
          >
            Enabled
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => alert("clicked")}
            disabled
          >
            Disabled
          </Button>
          <Button
            size="md"
            variant="secondary"
            onClick={() => alert("clicked")}
          >
            Enabled
          </Button>
          <Button
            size="md"
            variant="secondary"
            onClick={() => alert("clicked")}
            disabled
          >
            Enabled
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => alert("clicked")}
          >
            Enabled
          </Button>
          <Button size="xs" variant="secondary">
            Enabled
          </Button>
        </div>
        <div className="sub-section">
          <h3 className="section-sub-title">Outlined</h3>
          <Button size="lg" variant="outlined" onClick={() => alert("clicked")}>
            Enabled
          </Button>
          <Button
            size="lg"
            variant="outlined"
            onClick={() => alert("clicked")}
            disabled
          >
            Disabled
          </Button>
          <Button size="md" variant="outlined" onClick={() => alert("clicked")}>
            Enabled
          </Button>
          <Button
            size="md"
            variant="outlined"
            onClick={() => alert("clicked")}
            disabled
          >
            Enabled
          </Button>
          <Button size="sm" variant="outlined" onClick={() => alert("clicked")}>
            Enabled
          </Button>
          <Button size="xs" variant="outlined" onClick={() => alert("clicked")}>
            Enabled
          </Button>
        </div>
      </section>
      {/* AddEmojiButton */}
      <section css={sectionStyle}>
        <h2 className="section-title">AddEmojiButton</h2>
        <div className="sub-section">
          <AddEmojiButton size="lg" onClick={() => alert("clicked")}>
            Enabled
          </AddEmojiButton>
          <AddEmojiButton size="lg" onClick={() => alert("clicked")} disabled>
            Disabled
          </AddEmojiButton>
          <AddEmojiButton size="md" onClick={() => alert("clicked")}>
            Enabled
          </AddEmojiButton>
          <AddEmojiButton size="md" onClick={() => alert("clicked")} disabled>
            Disabled
          </AddEmojiButton>
          <AddEmojiButton size="sm" onClick={() => alert("clicked")}>
            Enabled
          </AddEmojiButton>
          <AddEmojiButton size="xs" onClick={() => alert("clicked")}>
            Enabled
          </AddEmojiButton>
        </div>
      </section>
      {/* Avatar */}
      <section css={sectionStyle}>
        <h2 className="section-title">Avatar</h2>
        <Avatar size="lg" onClick={() => alert("avatar clicked")} />
        <Avatar
          size="lg"
          imgSrc={avatarSampleImg}
          onClick={() => alert("avatar clicked")}
        />
        <Avatar size="md" imgSrc={avatarSampleImg} />
        <Avatar size="sm" imgSrc={avatarSampleImg} />
        <Avatar size="xs" imgSrc={avatarSampleImg} />
      </section>
      {/* Headers */}
      <section css={sectionStyle}>
        <h2 className="section-title">Headers</h2>
        <div className="sub-section">
          <h3 className="section-sub-title">GlobalHeader</h3>
          <GlobalHeader />
        </div>
        <div className="sub-section">
          <h3 className="section-sub-title">ListPageHeader</h3>
          <ListPageHeader recipient="Ashley Kim" />
        </div>
      </section>
      {/* Cards */}
      <section css={sectionStyle}>
        <h2 className="section-title">Cards</h2>
        <div className="sub-section">
          <h3 className="section-sub-title">MessageCard</h3>
          <div css={MessageCardListStyle}>
            <MessageCard messageData={mockMessage} isRecipient={true} />
          </div>
        </div>
        <div className="sub-section">
          <h3 className="section-sub-title">AddMessageCard</h3>
          <p className="tip">클릭 시 '/post' 페이지로 임시 이동</p>
          <div css={MessageCardListStyle}>
            <AddMessageCardButton />
          </div>
        </div>
        <div className="sub-section">
          <h3 className="section-sub-title">MessageCardList (readOnly)</h3>
          <MessageCardList messages={mockMessages} editMode={false} />
        </div>
        <div className="sub-section">
          <h3 className="section-sub-title">MessageCardList (editMode)</h3>
          <MessageCardList messages={mockMessages} editMode={true} />
        </div>
        <div className="sub-section">
          <h3 className="section-sub-title">MessageCardListEmpty (readOnly)</h3>
          <MessageCardList messages={[]} editMode={false} />
        </div>
        <div className="sub-section">
          <h3 className="section-sub-title">MessageCardListEmpty (editMode)</h3>
          <MessageCardList messages={[]} editMode={true} />
        </div>
      </section>
      <section css={sectionStyle}>
        <h2>Toast</h2>
        <Button
          variant="outlined"
          onClick={() => showToast({ message: "식곤증 미쳤다...😪" })}
        >
          토스트 열기
        </Button>
      </section>
      <section css={sectionStyle}>
        <h2>Modal</h2>
        <Button
          variant="outlined"
          onClick={() => showModal(<MessageCardModal data={mockMessage} />)}
        >
          모달 열기
        </Button>
        <MessageCardList
          messages={mockMessages}
          editMode={false}
          openMessageCardModal={(data) =>
            showModal(<MessageCardModal data={data} />)
          }
        />
      </section>
    </div>
  );
};
export default StyleGuidePage;

const pageStyle = css`
  width: var(--content-width);
  padding: var(--content-padding);
  margin: 30px auto;
`;

const sectionStyle = css`
  margin-bottom: 40px;
  padding-bottom: 30px;
  border-bottom: 1px solid var(--border-color);

  .section-title,
  .section-sub-title,
  .tip {
    margin-bottom: 1rem;
  }

  .sub-section {
    margin-bottom: 40px;
  }
`;
