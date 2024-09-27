// dashboard/qrcode/page.tsx
"use client";

import React, { useState } from 'react';
import styles from '@/app/dashboard/qrcode/Qrcode.module.css';
import Sidebar from '../Sidebar';
import Content from '../Content';
import { rubik } from '@/ui/fonts'; // Import fonts
import QrCodeGenerator from '@/app/components/qrcode/QrCodeGenerator'; // Ensure correct import

const Qrcode: React.FC = () => {
  const [myFormType, setMyFormType] = useState<'url' | 'other' | null>(null);
  const [myUrl, setMyUrl] = useState<string>('');
  const [myFormData, setMyFormData] = useState<{ key: string; value: string }[]>([{ key: '', value: '' }]);
  const [isFormActive, setIsFormActive] = useState(false);
  const [isQrCodeVisible, setIsQrCodeVisible] = useState(false); // Controls visibility of QrCodeGenerator
  const [qrCodeData, setQrCodeData] = useState<string | { key: string; value: string }[] | null>(null); // Controls data sent to QrCodeGenerator

  const handleOptionSelect = (option: 'url' | 'other') => {
    setMyFormType(option);
    setIsFormActive(true); // Activate the form
    if (option === 'url') {
      setMyUrl('');
    } else {
      setMyFormData([{ key: '', value: '' }]);
    }
  };

  const handleClose = () => {
    setMyFormType(null);
    setIsFormActive(false); // Deactivate the form
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
    if (!myUrl) {
      alert('Please enter a valid URL');
      return;
    }
    setQrCodeData(myUrl); // Send URL to QrCodeGenerator
    setIsQrCodeVisible(true); // Show QrCodeGenerator
    handleClose(); // Close the form
  };

  const handleSubmitOther = () => {
    const hasEmptyFields = myFormData.some(input => !input.key || !input.value);
    if (hasEmptyFields) {
      alert('Please fill in all fields');
      return;
    }
    setQrCodeData(myFormData); // Send data to QrCodeGenerator
    setIsQrCodeVisible(true); // Show QrCodeGenerator
    handleClose(); // Close the form
  };

  const handleGoBack = () => {
    setIsQrCodeVisible(false); // Hide QrCodeGenerator
    setQrCodeData(null); // Reset sent data
  };

  return (
    <div className={`${rubik.className}`}>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Content>
          {!isQrCodeVisible && !isFormActive && (
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
            </div>
          )}

          {myFormType === 'url' && isFormActive && !isQrCodeVisible && (
            <div className={styles.Container}>
              <h2 className={styles.Title}>Enter your URL here</h2>
              <input
                type="url"
                required
                placeholder="https://example.com"
                value={myUrl}
                onChange={handleUrlChange}
                className={styles.InputField}
              />
              <button className={styles.SubmitButton} onClick={handleSubmitUrl}>Submit</button>
              <button className={styles.CloseButton} onClick={handleClose}>Close</button>
            </div>
          )}

          {myFormType === 'other' && isFormActive && !isQrCodeVisible && (
            <div className={styles.Container}>
              <h2 className={styles.Title}><strong>Enter your data</strong></h2>
              <p className={styles.Description}>
                A <strong>label</strong> is a name, and the <strong>detail</strong> is the information that goes with it.
                For example, if the label is Phone, the detail would be your phone number.
              </p>
              <br />
              <p className={styles.Description}>Phone: 514 XXX XXXX</p>
              <br />
              {myFormData.map((input, index) => (
                <div className={styles.InputRow} key={index}>
                  <input
                    type="text"
                    placeholder="label"
                    aria-label="Enter label"
                    value={input.key}
                    onChange={(e) => handleInputChange(index, 'key', e.target.value)}
                    className={styles.InputField}
                  />
                  <input
                    type="text"
                    placeholder="detail"
                    aria-label="Enter detail"
                    value={input.value}
                    onChange={(e) => handleInputChange(index, 'value', e.target.value)}
                    className={styles.InputField}
                  />
                  <div className={styles.ButtonGroup}>
                    {myFormData.length > 1 && (
                      <button className={styles.RemoveButton} onClick={() => handleRemoveInput(index)}>-</button>
                    )}
                    {index === myFormData.length - 1 && (
                      <button className={styles.AddButton} onClick={handleAddInput}>+</button>
                    )}
                  </div>
                </div>
              ))}
              <button className={styles.CloseButton} onClick={handleClose}>Close</button>
              <button className={styles.SubmitButton} onClick={handleSubmitOther}>Submit</button>
            </div>
          )}

          {isQrCodeVisible && qrCodeData && (
            <QrCodeGenerator value={qrCodeData} onClose={handleGoBack} />
          )}
        </Content>
      </div>
    </div>
  );
};

export default Qrcode;
