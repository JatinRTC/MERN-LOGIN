import React from 'react';
import { Route , Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import Login from './Log/Login.jsx';
import Success from './Log/Success.jsx';
import Registor from './Log/SignUp.jsx';
import Dashboard from './demo/dashboard.jsx';
import Watchlist from './demo/userInfo.jsx';
import Home from './demo/home.jsx';
import Payout from './demo/payout.jsx';
import History from './demo/history.jsx';
import PutBalance from './demo/putAmount.jsx';

function App() {
  return (
    <Box>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/registor' element= {<Registor />} />
          <Route path='/success' element={<Success />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/watchlist' element={<Watchlist />} />
          <Route path='/home' element={<Home/>} />
          <Route path='/payload' element={<Payout />} />
          <Route path='/history' element={<History />} />
          <Route path='/putBalance' element={<PutBalance /> } />
        </Routes>
      </Box>
  );
}

export default App;
