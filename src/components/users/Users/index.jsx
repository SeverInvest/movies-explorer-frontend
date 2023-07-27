import "./style.scss";
import Header from "../../header/Header";
import CustomButton from "../../common/CustomButton";
import UsersCardList from "../UsersCardList";
import { fetchVideosAndUsers } from "../../../services/fetch";
import { useDispatch } from 'react-redux';

export default function Users() {

  const dispatch = useDispatch();

  function updateListUsers() {
    (async () => {
      await fetchVideosAndUsers(dispatch);
    }
    )();
  }

  return (
    <>
      <Header option="users" />
      <div className="users">
        <section className="users__section" aria-label="">
          <div className="users__container">
            <div className="users__buttons">
              <CustomButton
                type="button"
                className="users__button-open-popup"
                onClick={updateListUsers}
                aria-label="обновить"
                text={"Обновить"}
              />
            </div>
            <UsersCardList />
          </div>
        </section>
      </div>
    </>
  )
}