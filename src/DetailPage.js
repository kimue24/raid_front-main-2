import React from 'react';
import { useParams } from 'react-router-dom';

function DetailPage() {
  const { id } = useParams(); // :id에 해당하는 파라미터 값을 가져옴

  return (
    <div>
      <h2>Detail Page for ID: {id}</h2>
      {/* 파라미터를 사용한 내용을 렌더링 */}
    </div>
  );
}

export default DetailPage;
