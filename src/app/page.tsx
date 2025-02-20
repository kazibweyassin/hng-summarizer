'use client';

import ChatInput from '@/components/ChatInput/ChatInput';
import Navbar from '@/components/Navbar/Navbar';
import React from 'react';

export default function Page() {
  return (
    <div className=''>
      <Navbar />
      <ChatInput />
    </div>
  );
}
