import React from 'react';

const Login = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      {/* Outer Card */}
      <div className='w-full max-w-sm p-6 max-ms:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
        
        {/* Centered Content */}
        <div className='flex flex-col items-center justify-center'>
          
          {/* Heading and Description */}
          <div className='w-full py-6 text-center'>
            <h1 className='text-3xl font-bold'>
              <span className='text-primary'>Admin</span>
            </h1>
            <p className='font-light'>
              Enter your credentials to access the admin panel
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
