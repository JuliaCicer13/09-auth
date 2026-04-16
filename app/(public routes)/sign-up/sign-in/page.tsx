"use-client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, LoginRequest,} from '@/lib/api';
import { ApiError } from '@/app/api/api';

const SignIn = () => {
  const router =  useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (formData: FormData) => {
    try {
        const formValues = Object.fromEntries(formData) as LoginRequest;
        const res = await login(formValues);

        if (res) {
         router.push('/profile');
        } else {
            setError('Invalid email or password');
        }
    } catch (error) {
        setError(
            (error as ApiError).response?.data?.error ?? 
            (error as ApiError).message ??
            'Ooops...some error'
        )
    }
  };

  return (
    <form action={handleSubmit}>
       <h1>Sign In</h1>
       <label>
        Email 
        <input type="email" name="email" required/>
       </label>
       <label>
          Password
        <input type="password" name="password" required/>
       </label>
       <button type="submit">Log In</button>
       {error && <p>{error}</p>}
    </form>
  );
};

export default SignIn;



