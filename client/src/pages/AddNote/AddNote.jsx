import { useState } from 'react';
import { useAuth } from '../../context/auth';
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';

const AddNote = () => {
  const [note, setNote] = useState({
    title: "",
    description: "",
  })

  const navigate = useNavigate();

  const { user, API } = useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setNote({
      ...note,
      user: user,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(note);

    try {
      const response = await fetch(`${API}/api/note/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
      });


      if (response.ok) {
        setNote({
          title: "",
          description: "",
        })

        // eslint-disable-next-line no-unused-vars
        const data = await response.json();
        // console.log(data);

        toast.success('Note Added');
        navigate('/');
      } else {
        toast.error('Failed');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-field">
          <h1 className="AccHeading">Add Note</h1>
          <div className="addInputs">
            <input type="text" name="title" value={note.title} onChange={handleInput} placeholder="Title" className="input" autoComplete="off" required />
            <textarea name="description" value={note.description} onChange={handleInput} placeholder="Description" className="input" autoComplete="off" required></textarea>
          </div>
          <button type='submit' className="button">Add Note</button>
        </div>
      </form>
    </div>
  )
}

export default AddNote