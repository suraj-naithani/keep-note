import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import "./card.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import Loading from "../Loading/Loading";

const Card = () => {
  const [data, setData] = useState([]);

  const { authorizationToken, isLoggedIn, API, isLoading, user } = useAuth();

  const navigate = useNavigate();
  if (!user) {
    navigate("/login");
  }

  const getNotesData = async () => {
    try {
      const response = await fetch(`${API}/api/note/notes`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const res_data = await response.json();
      setData(res_data.userNotes);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${API}/api/note/notes/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      setData(data);

      if (response.ok) {
        getNotesData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotesData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : data && data.length ? (
        [...data].reverse().map((curData, index) => {
          return (
            <div key={index} className="card">
              <div className="titles">
                <h3>{curData.title}</h3>
                <div className="icons">
                  <Link to={`edit/${curData._id}`}>
                    <FaRegEdit className="icon" />
                  </Link>
                  <MdOutlineDelete
                    onClick={() => deleteNote(curData._id)}
                    className="icon"
                  />
                </div>
              </div>
              <p style={{ whiteSpace: "pre-line" }} className="para">
                {curData.description}
              </p>
            </div>
          );
        })
      ) : (
        <>
          {!isLoggedIn ? (
            <Link to="/login" className="card">
              <div className="addCard">
                Add Note
                <IoMdAdd className="addIcon" />
              </div>
            </Link>
          ) : (
            <Link to="/addnote" className="card">
              <div className="addCard">
                Add Note
                <IoMdAdd className="addIcon" />
              </div>
            </Link>
          )}
        </>
      )}
    </>
  );
};

export default Card;
