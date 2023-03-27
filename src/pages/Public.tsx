import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Nav } from "@components/Nav";
import { db } from "@config/index";
import { addDoc, collection } from "firebase/firestore";
import { type PropsPublic } from "@interface/PropsPublic";
import { type PostFormTypes } from "@interface/PostFormTypes";
import "@styles/Public.scss";

export const Public: React.FC<PropsPublic> = ({ currentUser }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState<string | File>("");
  const [loadingImage, setLoadingImage] = useState<number | null>(null);
  const [postForm, setPostForm] = useState<PostFormTypes>({
    title: "",
    content: "",
  });

  const handlePublic = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = currentUser?.email;
      await addDoc(collection(db, "posts"), {
        title: postForm.title,
        content: postForm.content,
        createdBy: user,
        timeStamp: new Date().toLocaleDateString(),
      }).then(() => navigate("/"));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Nav />
      <div className="public__container">
        <form className="public__form" onSubmit={handlePublic}>
          <div className="public__container__info">
            <label className="public__label">Title</label>
            <input
              className="public__input"
              type="text"
              name="title"
              onChange={({ target }) =>
                setPostForm({ ...postForm, title: target.value })
              }
            />
          </div>
          <div className="public__container__info">
            <label className="public__label">Content</label>
            <textarea
              className="public__input public__textarea"
              name="content"
              onChange={({ target }) =>
                setPostForm({ ...postForm, content: target.value })
              }
            />
          </div>
          <div className="public__container__button">
            <button
              className="public__button"
              disabled={loadingImage !== null && loadingImage < 100}
              type="submit"
            >
              Public
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
