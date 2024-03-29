// import endpoints from "../services/endpoints";

export function loadState() {
  try {
    const redux = localStorage.getItem("redux");
    if (!redux || JSON.parse(redux).countKeys === 0) {

      return {
        videos: {
          videos: {},
          isLoading: false,
          error: "",
          keys: [],
          countKeys: 0
        },
        user: {
          videos: [],
          isLoading: false,
          error: "",
          userId: "",
          userName: "",
          userEmail: "",
          isLoggedIn: false,
          userRoles: [],
        },
        users: {
          users: {},
          error: "",
          keys: [],
          countKeys: 0,
        },
        popup: {
          isVisiblePopupForm: false,
          isVisiblePopupAlarm: false,
          messageAlarm: "",
        }
      };
    }
    return JSON.parse(redux);

  } catch (e) {
    console.log(e);
  }
}

export async function saveState(state) {
  try {
    localStorage.setItem("redux", JSON.stringify(state));
  } catch (e) {
    console.log(e);
  }
}