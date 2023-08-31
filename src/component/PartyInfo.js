import React, { useState, useEffect } from 'react';
import '../css/PartyInfo.css'

function PartyInfo(props) {

//local테스트
//const apiServer = 'http://localhost:4000/'
//실서버
const apiServer = 'https://port-0-raid-dihik2mlj3yqyqm.sel4.cloudtype.app/'

const raidSeq = props.selectedRaidSeq;
const onPartySeqChange = props.onPartySeqChange;

//partyInfo 상태변화
const [partyInfo, setpartyInfo] = useState([]);
const [selectedPartyIndex, setSelectedPartyIndex] = useState(0); // Added this line

const handlePartyButtonClick = (index) => {
  setSelectedPartyIndex(index);
  onPartySeqChange(partyInfo[index].party_seq);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour24: true,
    timeZone: 'UTC'
  };

  return date.toLocaleString('ko-KR', options)
};


useEffect(() => {
  const fetchPartyInfo = async () => {
    try {
      const url = apiServer + `party?raidSeq=${raidSeq}`;
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error('Failed to fetch raid info');
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setpartyInfo(data);
        console.log(data);
        
        if (data.length > 0) {
            //partyMemberAdd로 전달할 partySeq갱신
            onPartySeqChange(data[0].party_seq);
        } else {
          return null;
          }
      } else {
          throw new Error('Invalid raid info data');
        }
    } catch (error) {
        console.error('Error fetching raid info:', error);
      }
    };
  
    if (raidSeq !== '') {
      fetchPartyInfo();
    }
  }, [raidSeq,onPartySeqChange]);


  return (
    <div className="container">
      <div className="party-buttons">
        {partyInfo.map((party, index) => (
          <button
          key={`${party.party_seq}-${index}`} // 수정된 부분
          onClick={() => handlePartyButtonClick(index)}
            className={index === selectedPartyIndex ? 'active' : ''}
          >
          {party.raid_name} {formatDate(party.party_date)}
          </button>
        ))}
      </div>
      {selectedPartyIndex !== null && selectedPartyIndex < partyInfo.length && ( // selectedPartyIndex의 유효성을 확인
        <div className="RaidButton" key={partyInfo[selectedPartyIndex].party_seq}>
          <h2>{partyInfo[selectedPartyIndex].raid_name}</h2>
          <p>레이드 수행시각: {formatDate(partyInfo[selectedPartyIndex].party_date)}</p>
          <p>레이드 옵션: {partyInfo[selectedPartyIndex].party_option_name}</p>
          <p>파티 구성원 정보</p>
          <table className="table-style">
            <thead>
              <tr>
                <th>아이디</th>
                <th>클래스</th>
                <th>아이템 레벨</th>
              </tr>
            </thead>
            <tbody>
            {partyInfo[selectedPartyIndex].members.map((member, index) => (
              <tr key={`${member.member_seq}-${index}`}>
                  <td>{member.member_name}</td>
                  <td>{member.member_class}</td>
                  <td>{member.member_level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <hr className='divider'/>
    </div>
  );
  
  
}

export default PartyInfo;
