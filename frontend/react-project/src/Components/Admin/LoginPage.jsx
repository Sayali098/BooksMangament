import React, { useState } from 'react';

const LoginPage = () => {
  // Step 2: Create state variables for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Step 3: Handle input changes
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Step 5: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Prepare the data to be sent to the backend
    const loginData = {
      username: username,
      password: password,
    };

    try {
      // Make an HTTP request to the backend
      const response = await fetch('https://your-backend-api.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      // Check if the request was successful
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        // Perform further actions based on the response, like saving the token or redirecting the user
      } else {
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during login request:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Username</p>
          {/* Step 4: Bind input values to state variables */}
          <input 
            type='text' 
            value={username} 
            onChange={handleUsernameChange} 
          />
        </div>
        <div>
          <p>Password</p>
          <input 
            type='password' 
            value={password} 
            onChange={handlePasswordChange} 
          />
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;



































































// import React from 'react'

// const LoginPage = () => {
    
//   return (
//     <div>
//         <div>
//            <p>UserName</p>
//         <input type='text'></input>
//         </div>
//         <div>
//             <p>Password</p>
//             <input type='password'></input>
//         </div>
//         <div>
//             <button>Submit</button>
//         </div>
//     </div>
//   )
// }

// export default LoginPage