import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { PassContext } from "./context/passContext"

import { QueryClient, QueryClientProvider, } from 'react-query'
import { BrowserRouter as Router } from 'react-router-dom';

const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Index />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

function Index() {

  const [passVal, setPassVal] = useState("")

  return <PassContext.Provider value={{ pass: passVal, setPass: (newPass: any) => { setPassVal(newPass) }, queryClient: queryClient }}>
    <QueryClientProvider client={queryClient}>
      <App />

    </QueryClientProvider>
  </PassContext.Provider >
}