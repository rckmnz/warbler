import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_MESSAGES, REMOVE_MESSAGE } from "../actionTypes";

export const loadMessages = messages => ({
  type: LOAD_MESSAGES,
  messages
});

export const fetchMessages = () => dispatch =>
  apiCall("get", "/api/messages").then(res =>
    dispatch(loadMessages(res)).catch(err => dispatch(addError(err.message)))
  );

export const postNewMessage = text => (dispatch, getState) => {
  const { currentUser } = getState();
  const { id } = currentUser.user;
  return apiCall("post", `/api/users/${id}/messages`, { text })
    .then(res => {})
    .catch(err => dispatch(addError(err.message)));
};

export const remove = id => ({
  type: REMOVE_MESSAGE,
  id
});

export const removeMessage = (userId, messageId) => dispatch =>
  apiCall("delete", `/api/users/${userId}/messages/${messageId}`)
    .then(dispatch(remove(messageId)))
    .catch(err => dispatch(addError(err.message)));
