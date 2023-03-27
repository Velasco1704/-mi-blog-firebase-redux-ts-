import { useEffect, useState } from "react";
import { Nav } from "@components/Nav";
import { Modal } from "@components/Modal";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@config/index";
import { type ModalState } from "@interface/ModalState";
import { type PostTypes } from "@interface/PostTypes";
import { type PropsHome } from "@interface/PropsHome";
import { BsFillTrash3Fill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import "@styles/Home.scss";

export const Home: React.FC<PropsHome> = ({ currentUser }) => {
  const [post, setPost] = useState<PostTypes[]>([]);
  const [modalState, setModalState] = useState<ModalState>({
    closeOrOpen: false,
    propsModal: {
      id: "",
      valueTitle: "",
      valueContent: "",
      user: "",
      timeStamp: "",
    },
  });

  const handleDelete = async (id: string) =>
    await deleteDoc(doc(db, "posts", id)).catch((er) => console.log(er));

  useEffect(() => {
    const getAllProducts = onSnapshot(
      collection(db, "posts"),
      (snapshot) => {
        let list: DocumentData[] = [];
        snapshot.docs.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id });
        });
        setPost(list as PostTypes[]);
      },
      (err) => console.log(err)
    );
    return () => {
      getAllProducts();
    };
  }, []);

  return (
    <>
      <Nav />
      <div className="home__container">
        <h1 className="home__h1">Home</h1>
        <div className="home__layout">
          {post.map((post) => (
            <div className="home__post" key={post.id}>
              <h2 className="home__post__h2">{post.title}</h2>
              <p className="home__post__author">By: {post.createdBy}</p>
              <p className="home__post__content">{post.content}</p>
              <p className="home__post__timeStamp">{post.timeStamp}</p>
              {currentUser?.email === post.createdBy && (
                <div className="home__container__buttons">
                  <button
                    className="home__button home__edit"
                    onClick={() =>
                      setModalState({
                        closeOrOpen: !modalState.closeOrOpen,
                        propsModal: {
                          id: post.id,
                          valueTitle: post.title,
                          valueContent: post.content,
                          user: post.createdBy,
                          timeStamp: post.timeStamp,
                        },
                      })
                    }
                  >
                    <BsPencilSquare />
                  </button>
                  <button
                    className="home__button home__delete"
                    onClick={() => handleDelete(post.id)}
                  >
                    <BsFillTrash3Fill />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        {modalState.closeOrOpen && (
          <Modal
            id={modalState.propsModal.id}
            valueTitle={modalState.propsModal.valueTitle}
            valueContent={modalState.propsModal.valueContent}
            modalState={modalState}
            setModalState={setModalState}
          />
        )}
      </div>
    </>
  );
};
