import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ApplicationForm from './components/ApplicationForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Job Application Form</h1>
      </header>
      <main className="container mt-5">
        <ApplicationForm />
      </main>
    </div>
  );
}

export default App;
