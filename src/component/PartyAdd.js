import React, { useState } from 'react';
import fetch from 'isomorphic-fetch';
import { Form } from 'react-bootstrap';
import '../css/PartyAdd.css'


const PartyAdd = (props) => {

  const raidSeq = props.selectedRaidSeq;
  const checkboxOptions = ['트라이', '업둥이', '반숙', '숙련'];
  const today = new Date().toISOString().slice(0, 10); //오늘날짜
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10)); //오늘날짜
  const [selectedTime, setSelectedTime] = useState('23:00'); // 오후 11시로 초기화
  const [selectedOption, setSelectedOption] = useState('');
  const [, setSubmitResult] = useState('');


  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedOption) {
      alert('옵션을 선택해주세요.');
      return;
    }
    
    

    const requestData = {
      raidSeq: raidSeq,
      partyDate: `${selectedDate} ${selectedTime}`,
      optionName: selectedOption
    };
    try {
      //const response = await fetch('https://port-0-raid-dihik2mlj3yqyqm.sel4.cloudtype.app/addParty', {
      const response = await fetch('http://localhost:4000/addParty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      if (response.ok) {
        setSubmitResult('Success');
        alert('파티가 추가되었습니다.');
        window.location.reload();
      } else {
        setSubmitResult('Fail');
      }
    } catch (error) {
      console.error(error);
      setSubmitResult('Fail');
    }
  };


  
  return (
    <div>
      <form onSubmit={handleSubmit} className="d-flex">
        <div className='dateTime'>
          <div className='date'>
            <Form.Group controlId='formDate'>
              <Form.Label>레이드 일자: </Form.Label>
              <Form.Control type='date' value={selectedDate} onChange={handleDateChange} min={today} />
            </Form.Group>
          </div>
          <div className='time'>
            <Form.Group controlId='formTime'>
              <Form.Label>시간:</Form.Label>
              <Form.Control type='time' value={selectedTime} onChange={handleTimeChange} />
            </Form.Group>
          </div>
        </div>
        <div className='optionSubmit'>
          <div className='option'>
            <Form.Label>옵션: </Form.Label> &nbsp;&nbsp;
            {checkboxOptions.map((option, index) => (
              <Form.Check
                key={`option-${index}`}
                type="radio"
                name="checkboxOptions"
                id={`option-${index}`}
                label={option}
                value={option}
                checked={selectedOption === option}
                onChange={() => handleOptionChange(option)}
              />
            ))}
          </div>
          <div className="btn-group-vertical">
                <button type="submit" className="btn btn-primary">파티 추가</button>
          </div>
        </div>
      </form>
      <div className='line'></div>
    </div>
  );
};

export default PartyAdd;