import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // 부트스트랩 CSS 추가


const CharacterList = () => {
  const [characterData, setCharacterData] = useState([]);
  const [characterRaidCount, setCharacterRaidCount] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // 팝업 상태 변수

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');
    const apiUrl = `https://port-0-raid-dihik2mlj3yqyqm.sel4.cloudtype.app/myCharacter/?Id=${idParam}`;

    axios.get(apiUrl)
      .then(response => {
        const data = response.data;
        setCharacterData(data.characterRaidInfo || []);
      // 응답 데이터 형태에 맞게 수정(String 형태)
      const characterRaidCountData = data.characterRaidCount[0] || {}; // 첫 번째 객체만 사용
      setCharacterRaidCount(characterRaidCountData);
    })
      .catch(error => {
        console.error('API 요청 오류:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleRaidCheckboxChange = (index, raidName) => {
    setCharacterData(prevData => {
      const newData = [...prevData];
      newData[index] = { ...newData[index] };
      newData[index][raidName] = newData[index][raidName] === 'Y' ? 'N' : 'Y';
      return newData;
    });
  };

   const handleSendData = async (index) => {
    try {
      const updatedCharacter = characterData[index];

      const response = await axios.get('https://port-0-raid-dihik2mlj3yqyqm.sel4.cloudtype.app/updateRaid', {
        params: {
          Name: updatedCharacter.character_name,
          valtan: updatedCharacter.valtan,
          biackiss: updatedCharacter.biackiss,
          kouku: updatedCharacter.kouku,
          abrelshud: updatedCharacter.abrelshud,
          illiakan: updatedCharacter.illiakan,
          argos: updatedCharacter.argos,
          kayang: updatedCharacter.kayang,
          sanga: updatedCharacter.sanga,
          discordId: updatedCharacter.discordId
        }
      });

      const updatedCharacterData = response.data.characterRaidInfo;
      setCharacterData(updatedCharacterData);
      setShowSuccessPopup(true);
  
      // 전송 성공 후 3초 후에 페이지 리프레쉬
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error('레이드 업데이트 오류:', error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>레이드 현황</h2>
      <ul className="list-group">
        {Object.entries(characterRaidCount).map(([raidKey, count]) => {
          const raidNameMap = {
            argos_count: '아르고스 레이드',
            valtan_count: '발탄 레이드',
            biackiss_count: '비아키스 레이드',
            kouku_count: '쿠크 레이드',
            abrelshud_count: '아브렐슈드 레이드',
            illiakan_count: '일리아칸 레이드',
            kayang_count: '카양겔 레이드',
            sanga_count: '상아탑 레이드'
          };
          const raidName = raidNameMap[raidKey] || raidKey;
  
          return (
            <li key={raidKey}>
              {raidName}
              {count}
            </li>
          );
        })}
      </ul>
      <br/>
  
      <h1>내 캐릭터</h1>
      {characterData.map((character, index) => (
         <div key={index}>
          <h2>{character.character_name}</h2>
          <p>레벨: {character.character_level}</p>
          <p>클래스: {character.character_class}</p>
          <p>아르고스: {character.argos === 'Y' ? '완료' : (character.argos === 'N' ? '대기' : '불가')}  
            <input
              type="checkbox"
              checked={character.argos === 'Y'}
              disabled={character.argos === 'D'} 
              onChange={() => handleRaidCheckboxChange(index, 'argos')}
            />
          </p>
          <p>발탄: {character.valtan === 'Y' ? '완료' : (character.valtan === 'N' ? '대기' : '불가')}  
            <input
              type="checkbox"
              checked={character.valtan === 'Y'}
              disabled={character.valtan === 'D'}
              onChange={() => handleRaidCheckboxChange(index, 'valtan')}
            />
          </p>
          <p>비아: {character.biackiss === 'Y' ? '완료' : (character.biackiss === 'N' ? '대기' : '불가')}
            <input
              type="checkbox"
              checked={character.biackiss === 'Y'}
              disabled={character.biackiss === 'D'}
              onChange={() => handleRaidCheckboxChange(index, 'biackiss')}
            />
          </p>
          <p>쿠크: {character.kouku === 'Y' ? '완료' : (character.kouku === 'N' ? '대기' : '불가')}
            <input
              type="checkbox"
              checked={character.kouku === 'Y'}
              disabled={character.biackiss === 'D'}
              onChange={() => handleRaidCheckboxChange(index, 'kouku')}
            />
          </p>
          <p>아브: {character.abrelshud === 'Y' ? '완료' : (character.abrelshud === 'N' ? '대기' : '불가')}
            <input
              type="checkbox"
              checked={character.abrelshud === 'Y'}
              disabled={character.abrelshud === 'D'}
              onChange={() => handleRaidCheckboxChange(index, 'abrelshud')}
            />
          </p>
          <p>아칸: {character.illiakan === 'Y' ? '완료' : (character.illiakan === 'N' ? '대기' : '불가')}
            <input
              type="checkbox"
              checked={character.illiakan === 'Y'}
              disabled={character.illiakan === 'D'}
              onChange={() => handleRaidCheckboxChange(index, 'illiakan')}
            />
          </p>
          <p>카양겔: {character.kayang === 'Y' ? '완료' : (character.kayang === 'N' ? '대기' : '불가')}
            <input
              type="checkbox"
              checked={character.kayang === 'Y'}
              disabled={character.kayang === 'D'}
              onChange={() => handleRaidCheckboxChange(index, 'kayang')}
              />
        </p>
          <p>상아탑: {character.sanga === 'Y' ? '완료' : (character.sanga === 'N' ? '대기' : '불가')}
            <input
              type="checkbox"
              checked={character.sanga === 'Y'}
              disabled={character.sanga === 'D'}
              onChange={() => handleRaidCheckboxChange(index, 'sanga')}
              />
        </p>
        <button onClick={() => handleSendData(index)}>전송</button>
        </div>
      ))}
      {showSuccessPopup && (
        <div className="success-popup">
          <p>전송이 성공했습니다!</p>
          <p>3초후에 캐릭터 페이지가 새로고침됩니다.</p>
        </div>
      )}
    </div>
  );
};
export default CharacterList;