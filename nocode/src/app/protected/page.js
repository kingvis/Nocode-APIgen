'use client';
import React, { Suspense } from 'react';
import ProtectedPageContent from './ProtectedPageContent';

export default function ProtectedPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProtectedPageContent />
    </Suspense>
  );
} 