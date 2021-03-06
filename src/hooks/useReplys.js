import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
  fetchReply,
  ReplySelector,
  createReply as _createReply,
} from "../redux/reply";

function useReply() {
  const dispatch = useDispatch();
  const reply = useSelector(ReplySelector);

  useEffect(() => {
    dispatch(fetchReply());
  }, [dispatch]);

  const createReply = (userId,commentId ,content) =>
    dispatch(_createReply(userId,commentId, content));

  return { reply, createReply };
}

export default useReply;
