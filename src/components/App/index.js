import React, { useEffect, useState, useRef, useCallback } from "react";
import autosize from "autosize";

import "./App.css";
import useComments from "../../hooks/useComments";
import useReply from "../../hooks/useReplys";
import useUsers from "../../hooks/useUsers";

function App() {
  const { comments, createComment } = useComments();
  const { reply, createReply } = useReply();
  const { users } = useUsers();
  const textareaRef = useRef();
  const [userId, setUserId] = useState(null);
  const [commentId, setCommentId] = useState(null);
  const [content, setContent] = useState("");
  const [replyId, setReplyId] = useState(null);

  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    autosize(textareaRef.current);
  }, []);

  useEffect(() => {
    if (users.length) {
      setUserId(users[0].id);
    }
  }, [users]);

  const handleContentChange = (e) => {
    setContent(e.target.value);
    console.log(e.target.value);
  };
  const handleCommentID = (e) => {
    setCommentId(e.target.value);
    //console.log(commentID+"comment id is here")
  };

  const handleUserChange = (e) => setUserId(parseInt(e.target.value));
  const handleCommentChange = (e) => setReplyId(
    // console.log(e.target.value)
    parseInt(e.target.value)
    );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!userId) {
        alert("No user selected");
        return;
      }

      createComment(userId, content);
      setContent("");
    },
    [userId, content, createComment]
  );

  const handleReply = useCallback(
    (e) => {
      e.preventDefault();

      console.log();
      if (!replyId) {
        alert("No user selected or there is no comments ");
        return;
      }

      createReply(userId, replyId, commentId);
      // setContent("");
      alert("Reply added");
    },
    [userId, replyId, commentId, createReply]
  );

  return (
    <div className="comments-container">
      <header className="comments-header">
        <h1>Comments</h1>
      </header>
      <section className="compose">
        <h2 className="compose__heading">You say...</h2>
        <form className="compose__body" onSubmit={handleSubmit}>
          <textarea
            ref={textareaRef}
            rows={4}
            placeholder="Enter Comments Here"
            required
            autoFocus
            value={content}
            onChange={handleContentChange}
            className="compose__textarea"
          />
          <div className="compose__dropdown">
            <label htmlFor="user-select">Comment as</label>
            <select
              id="user-select"
              onChange={handleUserChange}
              className="dropdown"
            >
              {users.map((user) => (
                <>
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                </>
              ))}
            </select>
          </div>
          <div className="compose__button">
            <button className="button button--primary">Submit</button>
          </div>
        </form>
      </section>
      <section className="compose">
        
        <header className="comments-header">
        <h1>Replies</h1>
      </header>
      <h2 className="compose__heading">You say...</h2>
        <form className="compose__body" onSubmit={handleReply}>
          <textarea
            ref={textareaRef}
            rows={4}
            placeholder="Enter Replies here"
            required
            autoFocus
            value={commentId}
            onChange={handleCommentID}
            className="compose__textarea"
          />
          <div className="compose__dropdown">
            <label htmlFor="user-select">Reply to</label>
            <select
              id="user-select"
              onChange={handleCommentChange}
              className="dropdown"
            >
              
              {/* {[...comments].map((c) => (
                <> */}
                  {users
                  .map((u)=>(
                    <option key={u.id} value={u.id}>
                    {u.name}
                  </option>

                  ))}
                    
                 
                {/* </>
              ))} */}
            </select>
          </div>
          <div className="compose__button">
            <button className="button button--primary">Post</button>
          </div>
        </form>

      </section>

      <section className="comments">
        {[...comments]

          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((comment) => (
            <>
              <div key={comment.id} className="comment">
                <header className="comment__header">
                  <h2 className="comment__heading">
                    {comment.user.name} says...
                  </h2>
                  <span className="comment_timestamp">
                    {new Intl.DateTimeFormat("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(comment.created_at))}
                  </span>
                </header>

                <p className="comment__body">{comment.content}</p>

                {[...reply]

                  .sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                  )
                  .map((replies) => (
                    <>
                      {replies.comment_id === comment.id ? (
                        <div key={replies.id} className="replies" >
                          <header className="comment__header">
                            <i>Replies</i>
                            <h2 className="comment__heading">
                              
                            </h2>
                            <span className="comment_timestamp">
                              {new Intl.DateTimeFormat("en-US", {
                                dateStyle: "medium",
                                timeStyle: "short",
                              }).format(new Date(replies.created_at))}
                            </span>
                          </header> 

                          <p className="comment__body">{replies.content}</p>
                        </div>
                      ) : null}
                    </>
                  ))}
              </div>
            </>
          ))}
        <div></div>
      </section>
    </div>
  );
}

export default App;
