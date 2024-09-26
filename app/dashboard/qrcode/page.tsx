// Qrcode.tsx
"use client";

import React, { useState } from 'react';
import styles from '@/app/dashboard/qrcode/Qrcode.module.css'; // Import the styles
import Sidebar from '../Sidebar';
import Content from '../Content';

const Qrcode: React.FC = () => {
  const [myFormType, setMyFormType] = useState<'url' | 'other' | null>(null);
  const [myUrl, setMyUrl] = useState<string>('');
  const [myFormData, setMyFormData] = useState<{ key: string; value: string }[]>([{ key: '', value: '' }]);

  const handleOptionSelect = (option: 'url' | 'other') => {
    setMyFormType(option);
    if (option === 'url') {
      setMyUrl('');
    } else {
      setMyFormData([{ key: '', value: '' }]);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMyUrl(e.target.value);
  };

  const handleInputChange = (index: number, field: 'key' | 'value', value: string) => {
    const updatedFormData = [...myFormData];
    updatedFormData[index][field] = value;
    setMyFormData(updatedFormData);
  };

  const handleAddInput = () => {
    if (myFormData.length < 5) {
      setMyFormData([...myFormData, { key: '', value: '' }]);
    }
  };

  const handleRemoveInput = (index: number) => {
    const updatedFormData = myFormData.filter((_, i) => i !== index);
    setMyFormData(updatedFormData);
  };

  const handleSubmitUrl = () => {
    console.log('URL submitted:', myUrl);
    setMyFormType(null);
  };

  const handleSubmitOther = () => {
    console.log('Data submitted:', myFormData);
    setMyFormType(null);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <Content>
        <div className={styles.Container}>
          <h1 className={styles.Title}>Select an Option</h1>
          <div className={styles.Options}>
            <button className={styles.OptionButton} onClick={() => handleOptionSelect('url')}>
              Enter URL
            </button>
            <button className={styles.OptionButton} onClick={() => handleOptionSelect('other')}>
              Other Data
            </button>
          </div>

          {/* Show corresponding form based on selection */}
          {myFormType === 'url' && (
            <div>
              <h2>Enter your URL here</h2>
              <input 
                type="url" 
                required 
                placeholder="https://example.com" 
                value={myUrl} 
                onChange={handleUrlChange} 
                className={styles.InputField} 
              />
              <button className={styles.CloseButton} onClick={() => setMyFormType(null)}>Close</button>
              <button className={styles.SubmitButton} onClick={handleSubmitUrl}>Submit</button>
            </div>
          )}
          {myFormType === 'other' && (
            <div>
              <h2>Enter your data</h2>
              {myFormData.map((input, index) => (
                <div key={index}>
                  <input 
                    type="text" 
                    placeholder="Key" 
                    value={input.key} 
                    onChange={(e) => handleInputChange(index, 'key', e.target.value)} 
                    className={styles.InputField} 
                  />
                  <input 
                    type="text" 
                    placeholder="Value" 
                    value={input.value} 
                    onChange={(e) => handleInputChange(index, 'value', e.target.value)} 
                    className={styles.InputField} 
                  />
                  {myFormData.length > 1 && (
                    <button className={styles.RemoveButton} onClick={() => handleRemoveInput(index)}>-</button>
                  )}
                </div>
              ))}
              <button className={styles.AddButton} onClick={handleAddInput}>+</button>
              <button className={styles.SubmitButton} onClick={handleSubmitOther}>Submit</button>
              <button className={styles.CloseButton} onClick={() => setMyFormType(null)}>Close</button>
            </div>
          )}
        </div>
      </Content>
    </div>
  );
};

export default Qrcode;
