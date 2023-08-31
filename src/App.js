import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import CharacterList from './CharacterList';
import AboutPage from './AboutPage';
import DetailPage from './DetailPage'; // 파라미터를 받아 렌더링할 페이지 컴포넌트

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/CharacterList">발탄 리스트 페이지</Link>
            </li>
            <li>
              <Link to="/AboutPage">비아키스 리스트 페이지</Link>
            </li>
            <li>
             <Link to={`/`}>Go to Detail</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<CharacterList />} /> {/* 수정: 기본 경로 */}
          <Route path="/CharacterList/:id" element={<CharacterList />} />
          <Route path="/AboutPage" element={<AboutPage />} />
          <Route path="/:id" element={<DetailPage />} /> {/* :id는 파라미터 이름 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
