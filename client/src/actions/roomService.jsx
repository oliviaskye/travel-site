const fetchData = async ({ url, method = 'POST', token = '', body = null }, dispatch) => {
  const headers = token
    ? { 'Content-Type': 'application/json', authorization: `Bearer ${token}` }
    : { 'Content-Type': 'application/json' };

  const bodyContent = body ? JSON.stringify(body) : null;

  try {
    const response = await fetch(url, { method, headers, body: bodyContent });
    const data = await response.json();

    if (!data.success) {
      if (response.status === 401) {
        dispatch({ type: 'UPDATE_USER', payload: null });
      }
      throw new Error(data.message);
    }
    return data.result;
  } catch (error) {
    dispatch({ type: 'UPDATE_ALERT', payload: { open: true, severity: 'error', message: error.message } });
    console.log(error);
    return null;
  }
};


export const createRoom = async (room, currentUser, dispatch, setPage) => {
  dispatch({ type: 'START_LOADING' });

  const url = "http://localhost:5000/api/room";

  const result = await fetchData(
    { url, body: room, token: currentUser?.token },
    dispatch
  );

  if (result) {
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'The room has been added successfully',
      },
    });
    dispatch({ type: 'RESET_ROOM' });
    setPage(0);
  }

  dispatch({ type: 'END_LOADING' });
};

