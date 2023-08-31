import React from "react"
import '../css/Raid.css'


function Raid({ raidInfo, onClick }) {
  
  const getRaidImg = (raidName) => {
    return `../Img/${raidName}.jpeg`;
  };
  

  return (
    <div>
      {raidInfo.raids.map((raid) => (
        <div className="RaidButton" key={raid.raid_seq}>
          <button onClick={() => onClick(raid.raid_seq)}>
            <img className="RaidButtonImg" src={getRaidImg(raid.raid_name)} alt="Button" />
          </button>
          <aside>{raid.raid_name}</aside>
        </div>
      ))}
    </div>
  );
}

export default Raid;