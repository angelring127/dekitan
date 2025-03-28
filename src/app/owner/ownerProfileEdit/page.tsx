'use client';

import { useState } from 'react';
import { Button } from '@/components/common/Button';
import InputField from '@/components/common/InputField'; 

export default function OwnerProfileEdit() {

  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  
  const [nicknameError, setNicknameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

 
  const validateNickname = () => {
    if (nickname.trim() === '') {
      setNicknameError('ニックネームの入力は必須です。');
    } else {
      setNicknameError('');
    }
  };

  const validatePassword = () => {
    const passwordRegex = /^[A-Za-z0-9./!+\-=_$#&%@]{8,16}$/;
    if (!password) {
      setPasswordError('パスワードは必須です。');
    } else if (!passwordRegex.test(password)) {
      setPasswordError('パスワードは8〜16文字以内で、記号は .!/+-_=$#&%@ が利用できます。');
    } else {
      setPasswordError('');
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      setEmailError('メールアドレスは必須です。');
    } else if (!emailRegex.test(email)) {
      setEmailError('メールアドレスが正しくありません。');
    } else {
      setEmailError('');
    }
  };


  const handleSubmit = () => {
    validateNickname();
    validatePassword();
    validateEmail();

    if (!nicknameError && !passwordError && !emailError) {
  
      console.log('Form submitted successfully');
    }
  };

  return (
    <div className="mx-auto flex h-[844px] w-[390px] flex-col items-center overflow-hidden bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat">
      <div className="bg-white p-6 m-10 h-[600px] w-[300px] mx-auto shadow-lg rounded-lg">
        <h4 className="text-center mb-6">プロフィール変更<br />プロフィールを変更できます。</h4>
        
        <InputField
          label="ニックネーム"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          onBlur={validateNickname}
          error={nicknameError}
        />

        <div className="my-4"></div>

        {/* Password Input */}
        <InputField
          label="パスワード"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={validatePassword}
          error={passwordError}
          placeholder="8〜16文字以内"
        />

        <div className="my-4"></div>

        {/* Email Input */}
        <InputField
          label="メールアドレス"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={validateEmail}
          error={emailError}
        />

        <div className="flex justify-center mt-6">
          <Button
            variant="primary"
            className="text-lg font-bold px-10 py-4 rounded-3xl"
            onClick={handleSubmit}
          >
            変更する
          </Button>
        </div>
      </div>


      <div className="flex justify-center mt-6">
        <Button
          variant="primary"
          className="text-lg font-bold px-10 py-4 rounded-3xl"
          onClick={() => {}}
        >
          もどる
        </Button>
      </div>
    </div>
  );
}
