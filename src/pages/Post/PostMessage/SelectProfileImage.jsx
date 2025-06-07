import { useState, useEffect } from "react";
import { css } from "@emotion/react";

const containerStyle = css`
  display: flex;
  gap: 32px;
`;

const defaultImgStyle = css`
  display: flex;
  margin-bottom: 12px;
`;

const selectImgStyle = css`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const selectImgContainerStyle = css`
  display: flex;
  flex-direction: column;
`;

const MOCK_PROFILE_IMAGES = [
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/65.jpg",
  "https://randomuser.me/api/portraits/men/76.jpg",
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/21.jpg",
];

const DEFAULT_IMAGE = "https://randomuser.me/api/portraits/lego/1.jpg";

const SelectProfileImage = ({ onChange }) => {
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    onChange(DEFAULT_IMAGE);
  }, [onChange]);

  const handleClick = (imgUrl) => {
    setSelectedImage(imgUrl);
    onChange(imgUrl);
  };

  return (
    <div>
      <div css={containerStyle}>
        <div css={defaultImgStyle}>
          <img
            src={selectedImage || DEFAULT_IMAGE}
            alt="선택된 이미지"
            style={{ width: 80, height: 80, borderRadius: "50%" }}
          />
        </div>
        <div css={selectImgContainerStyle}>
          <p className="form-control-hint">프로필 이미지를 선택해 주세요!</p>
          <div css={selectImgStyle}>
            {MOCK_PROFILE_IMAGES.map((img, idx) => (
              <img
                key={idx}
                src={img}
                onClick={() => handleClick(img)}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectProfileImage;
