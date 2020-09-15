import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserData = {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
};

let initialState: UserData = {
  uid: '',
  email: null,
  displayName: null,
  photoURL: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<firebase.User | UserData>) {
      const { uid, email, displayName, photoURL } = action.payload;
      state.displayName = displayName;
      state.uid = uid !== null ? uid : '';
      state.photoURL = photoURL;
      state.email = email;
    },
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
