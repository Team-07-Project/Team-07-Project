import MessageCardStyle from "./MessageCardStyle";
import Avatar from "../Avatar";
import { IconDeleteButton } from "./../Button/IconButtons";
import formatDate from "../../utils/formatDate";

const MessageCard = ({
  messageData = {},
  isEditable = false,
  onDelete = () => {},
}) => {
  const {
    id,
    sender,
    profileImageURL,
    relationship = "친구",
    content,
    font = "Pretendard",
    createdAt,
  } = messageData;

  const handleDelete = (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    onDelete(id); // 상위에서 넘겨준 삭제 로직 호출
  };

  return (
    <div
      css={MessageCardStyle}
      onClick={() => alert("CardViewModal will be opened")}
    >
      <div className="card-header">
        <div className="sender-profile-wrap">
          <Avatar imgSrc={profileImageURL} size="md" />
          <div className="sender-profile" style={{ fontFamily: font }}>
            <span className="name">
              From. <b>{sender}</b>
            </span>
            <span className="relationship">
              {/* badge 컴포넌트로 교체 예정 */}
              {relationship}
            </span>
          </div>
        </div>
        {isEditable && <IconDeleteButton onClick={handleDelete} />}
      </div>
      <div className="card-body">
        <p className="content">{content}</p>
      </div>
      <div className="card-footer">
        <span className="date">{formatDate(createdAt)}</span>
      </div>
    </div>
  );
};

export default MessageCard;
