import React, { useState, useEffect } from 'react';
import '../css/PartyMemberAdd.css'

function PartyMemberAdd(props) {
  //const apiServer = 'http://localhost:4000/';
  const apiServer = 'https://port-0-raid-dihik2mlj3yqyqm.sel4.cloudtype.app/';


  const partySeq = props.selectedPartySeq;
  const setSelectedPartySeq = props.setSelectedPartySeq;
  const handleReload = props.handleReload; // handleReload를 새로운 props로 추가합니다
 

  const [inputText, setInputText] = useState('');
  const [memberList, setMemberList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);


  const handleInputChange = (event) => {
    const searchText = event.target.value;
    setInputText(searchText);
    searchMembers(searchText);
  };

  const searchMembers = (query) => {
    if (query.trim() === '') {
      setSearchResults([]);
    } else {
      const results = memberList.filter((member) =>
        member.member_name.includes(query)
      );
      setSearchResults(results);
    }
  };

  const handleMemberSelect = (member) => {
    setSelectedMember(member);
    setSearchResults([]);
  };

  useEffect(() => {
    const fetchMemberList = async () => {
      try {
        const response = await fetch(apiServer + 'allMember');
        if (response.ok) {
          const data = await response.json();
          setMemberList(data);
        } else {
          throw new Error('Failed to fetch member list');
        }
      } catch (error) {
        console.error('Error fetching member list:', error);
      }
    };
    fetchMemberList();
  }, []);

  const memberAdd = async () => {
    try {
      if (selectedMember) {
        const requestData = {
          partySeq: partySeq,
          memberSeq: selectedMember.member_seq
        };
  
        const response = await fetch(apiServer + 'addPartyMember', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
        });
  
        if (response.ok) {
          const responseData = await response.text();
          if (responseData === 'alreadyRegister') {
            alert('이미 등록된 캐릭터입니다.');
            setSelectedMember(null);
            setSelectedPartySeq(partySeq);
            setInputText('');
            setSearchResults([]);
            
          } else if (responseData === 'Success') {
            alert('파티에 추가되었습니다.');
            setSelectedMember(null);
            setSelectedPartySeq(partySeq);
            setInputText('');
            setSearchResults([]);
            handleReload();
          } else {
            throw new Error('Failed to add member');
          }
        } else {
          throw new Error('Failed to add member');
        }
      }
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };
  

  return (
    <div>
      <div>{partySeq} </div>
      <div><h4>레이드 파티원 추가 </h4></div>
      <input type="text" value={inputText} onChange={handleInputChange} />
      {searchResults.length > 0 && (
        <div>
          
        <ul className={`member-list ${searchResults.length > 0 ? 'expanded' : ''}`}>
            {searchResults.map((member) => (
            <li key={member.member_seq} onClick={() => handleMemberSelect(member)}>
            {member.member_name}
        </li>
            ))}
        </ul>

        </div>
      )}
      {selectedMember && (
        <div className='selectMember'>
          <p>선택된 멤버:</p> 
          <p>{selectedMember.member_name}</p>
          <p>{selectedMember.member_level}</p>
          <p>{selectedMember.member_class}</p>
          <p> <button type="submit" onClick={memberAdd}>추가</button></p>
        
        </div>
      )}
       <div>

    
    </div>
     

    </div>

  );
}

export default PartyMemberAdd;