
export function loadState() {
  try {
    return JSON.parse(localStorage.getItem("redux"));
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function saveState(state) {
  try {
    localStorage.setItem("redux", JSON.stringify(state));
  } catch (e) {
    console.log(e);
  }
}