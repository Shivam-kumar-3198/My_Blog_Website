import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // TODO: Plug in your actual authentication API call here
    // Example placeholder:
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-[100dvh] bg-blue-50/50 flex items-center justify-center p-4 sm:p-6 font-sans">
      
      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 md:p-10 transition-all duration-300">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-sm sm:text-base text-gray-500 font-medium">
            Please sign in to your admin dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email Input */}
          <div>
            <label 
              className="block text-sm font-semibold text-gray-700 mb-1.5" 
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder="admin@example.com"
              className="w-full p-3 text-sm sm:text-base border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div>
            <label 
              className="block text-sm font-semibold text-gray-700 mb-1.5" 
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              placeholder="••••••••"
              className="w-full p-3 text-sm sm:text-base border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Extras: Remember Me & Forgot Password */}
          <div className="flex items-center justify-between pt-1 pb-2">
            <label className="flex items-center text-sm text-gray-600 cursor-pointer select-none">
              <input 
                type="checkbox" 
                className="w-4 h-4 mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
              />
              Remember me
            </label>
            <a 
              href="#" 
              className="text-sm text-blue-600 font-medium hover:text-blue-700 hover:underline transition-colors"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white text-base font-bold py-3 sm:py-3.5 rounded-xl hover:bg-blue-700 hover:shadow-md transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default Login;