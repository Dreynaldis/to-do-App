const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  loginData: {
    username: "",
    userid: "",
    loginStatus: false,
  },
};
export const loginSlice = createSlice({
  name: "loginauth",
  initialState,
  reducers: {
    loginHandler: (state, action) => {
      state.loginData.username = action.payload[0].username;
      state.loginData.userid = action.payload[0].userid;
      state.loginData.loginStatus = true;
    },
    logoutHandler: (state, action) => {
      state.loginData.username = "";
      state.loginData.userid = "";
      state.loginData.loginStatus = false;
    },
  },
});

export const { loginHandler, logoutHandler } = loginSlice.actions;
export default loginSlice.reducer;
