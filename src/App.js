import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Delivery from './components/Delivery'
import './App.css';

function App() {
  const [id, setId] = useState('');
  const [info, setInfo] = useState({ budget: '', notes: '' })

  const submit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/delivery', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    })
    const data = await response.json()
    setId(data.id)
  }

  return (
    <div className="py-5">
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
        {id === '' ?
          <div className="card">
            <div className="card-header">Create Delivery</div>
            <form className="card-body" onSubmit={submit}>
              <div className="mb-3">
                <input type="number" name="budget" className='form-control' placeholder="Enter Budget" />
              </div>
              <div className="mb-3">
                <textarea name="notes" className='form-control' placeholder="Enter Notes" />
              </div>
              <button className="btn btn-primary">Submit</button>
            </form>
          </div> :
          <Delivery id={id} />
        }
      </div>
    </div>
  );
}

export default App;
