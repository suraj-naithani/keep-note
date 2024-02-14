import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../../context/auth";

const Update = () => {
    const [note, setNote] = useState({
        "title": "",
        "description": "",
    })

    const params = useParams();
    // console.log(params)
    const { authorizationToken, API } = useAuth();
    const navigate = useNavigate();


    const getSingleNote = async () => {
        try {
            const response = await fetch(`${API}/api/note/notes/${params.id}`, {
                method: 'GET',
                headers: {
                    Authorization: authorizationToken,
                }
            })
            const res_data = await response.json();
            setNote(res_data);
            // console.log(res_data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSingleNote();
    }, [params.id]);

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setNote({
            ...note,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API}/api/note/notes/update/${params.id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": authorizationToken,
                },
                body: JSON.stringify(note),
            })

            if (response.ok) {
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="container">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="input-field">
                        <h1 className="">Edit Note</h1>
                        <div className="inputs">
                            <input type="text" name="title" value={note.title} onChange={handleInput} className="input" autoComplete="off" />
                            <textarea name="description" value={note.description} onChange={handleInput} className="input" autoComplete="off"></textarea>
                        </div>
                        <button type='submit' className="button">Update Note</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Update