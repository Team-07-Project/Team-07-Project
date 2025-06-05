import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { getColors, getImages } from "../../../api";
import { IconCheckButton } from "../../../components/Button/IconButtons";

// 스타일 컴포넌트들
const ToggleButtons = styled.div`
  display: flex;
  margin-top: 12px;

  button {
    width: 112px;
    height: 40px;
    padding: 8px 16px;
    border-radius: 6px;
    border: var(--gray-100);
    background-color: var(--gray-100);
    cursor: pointer;

    &.active {
      border: 2px solid var(--purple-600);
      background-color: var(--white);
      color: var(--purple-600);
    }
  }
`;

const ColorList = styled.div`
  padding: 40px 0px;
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

const ColorOption = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: ${({ selected }) => (selected ? "2px solid blue" : "1px solid #ccc")};
  background-color: ${({ color }) => color};
  cursor: pointer;
`;

const ImageList = styled.div`
  padding: 40px 0px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 12px;

  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ImageButton = styled.button`
  position: relative;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`;

const Thumbnail = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 12px;
  display: block;
  transition: filter 0.3s ease;
  filter: ${({ selected }) => (selected ? "brightness(60%)" : "none")};
`;

const CheckIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

// 텍스트 스타일
const BackgroundLabel = styled.span`
  color: var(--gray-900);
  font-size: var(--font-size-24);
  font-weight: var(--font-weight-bold);
`;

const SubText = styled.p`
  line-height: 26px;
  color: var(--gray-500);
  font-size: var(--font-size-16);
  font-weight: var(--font-weight-regular);
  margin: 0px 0px 24px;
`;

// 컴포넌트 본문
const SelectBackground = ({ onChange }) => {
  const [colors, setColors] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [mode, setMode] = useState("color");

  useEffect(() => {
    const fetchData = async () => {
      const colorsData = await getColors();
      const imagesData = await getImages();

      if (Array.isArray(colorsData)) setColors(colorsData);
      if (Array.isArray(imagesData)) setImages(imagesData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (colors.length && !selectedColor && !selectedImage && mode === "color") {
      const firstColor = colors[0];
      setSelectedColor(firstColor);
      onChange?.({
        backgroundColor: firstColor,
        backgroundImageURL: undefined,
      });
    }
  }, [colors, selectedColor, selectedImage, mode, onChange]);

  const handleColorClick = (color) => {
    setSelectedColor(color);
    setSelectedImage("");
    onChange?.({ backgroundColor: color, backgroundImageURL: undefined });
  };

  const handleImageClick = (url) => {
    setSelectedImage(url);
    setSelectedColor("");
    onChange?.({ backgroundColor: undefined, backgroundImageURL: url });
  };

  return (
    <div>
      <BackgroundLabel>배경화면을 선택해 주세요.</BackgroundLabel>
      <SubText>컬러를 선택하거나, 이미지를 선택할 수 있습니다.</SubText>

      <ToggleButtons>
        <button
          onClick={() => setMode("color")}
          className={mode === "color" ? "active" : ""}
        >
          컬러
        </button>
        <button
          onClick={() => setMode("image")}
          className={mode === "image" ? "active" : ""}
        >
          이미지
        </button>
      </ToggleButtons>

      {mode === "color" && (
        <ColorList>
          {colors.map((color) => (
            <ColorOption
              key={color}
              color={color}
              selected={selectedColor === color}
              onClick={() => handleColorClick(color)}
            />
          ))}
        </ColorList>
      )}

      {mode === "image" && (
        <ImageList>
          {images.map((url, idx) => (
            <ImageButton key={idx} onClick={() => handleImageClick(url)}>
              <Thumbnail src={url} selected={selectedImage === url} />
              {selectedImage === url && (
                <CheckIconWrapper>
                  <IconCheckButton />
                </CheckIconWrapper>
              )}
            </ImageButton>
          ))}
        </ImageList>
      )}
    </div>
  );
};

export default SelectBackground;
