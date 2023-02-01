import { useState } from 'react';

function IndexPopup() {
  const [data, setData] = useState('');
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 16,
      }}
    >
      <h2>
        Welcome to your{' '}
        <a href="https://www.plasmo.com" target="_blank" rel="noreferrer">
          Plasmo
        </a>{' '}
        Extension!
      </h2>
      <input onChange={(e) => setData(e.target.value)} value={data} />
      <a href="https://docs.plasmo.com" target="_blank" rel="noreferrer">
        View Docs
      </a>
      {/* <button
        onClick={() => {
          chrome.tabs.create({
            url: './tabs/delta-flyer.html',
          });
        }}
      >
        open tab page
      </button> */}
    </div>
  );
}

export default IndexPopup;
