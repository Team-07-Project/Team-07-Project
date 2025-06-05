import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/Main/components/MainPage.jsx";
import ListPage from "../pages/List/ListPage";
import StyleGuidePage from "../pages/StyleGuide/StyleGuidePage";
import PostDetailPage from "../pages/Post/PostDetail/PostDetailPage.jsx";
import PostCreatePage from "../pages/Post/PostCreatePage.jsx";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/list" element={<ListPage />} />
      <Route path="/post" element={<PostCreatePage />} />
      <Route path="/post/:id/*" element={<PostDetailPage />} />

      {/* 스타일 가이드 페이지: 디자인 시스템의 공통 컴포넌트 테스트 및 확인용 임시 공간입니다. */}
      <Route path="styleGuide" element={<StyleGuidePage />} />
    </Routes>
  );
}

export default Router;
