"use client";

import { Button } from '@/components/ui/button';
import React from 'react'

const Error = ({
    error,
    reset
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) => {
  return (
    <div className='w-full h-screen flex items-center justify-center gap-5'>
        <h1>Something went wrong</h1>
        <p>{error.message}</p>
        <Button onClick={() => reset()}>Try again</Button>
    </div>
  )
}

export default Error