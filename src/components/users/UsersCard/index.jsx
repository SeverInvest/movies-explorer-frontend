import "./style.scss";
import CustomButton from "../../common/CustomButton";
import { useSelector, useDispatch } from 'react-redux';
import { verifyDate } from "../../../utils";
import { updateRoles } from "../../../services/fetch";

export default function UsersCard({
  card
}) {
  const userRoles = useSelector(state => state.user.userRoles);
  const users = useSelector(state => state.users.users);
  const videos = useSelector(state => state.videos.videos);
  const videosKeys = useSelector(state => state.videos.keys);
  const dispatch = useDispatch();
  const isAdmin = userRoles.includes("ADMIN");

  // количество добавленных видео пользователем
  const countAddVideo = videosKeys.reduce((acc, key) => {
    if (videos[key].owner === card) { acc = acc + 1 }
    return acc;
  }, 0);

  // сколько лайков собрали все добавленные пользователем видео
  const userArrayKeys = videosKeys.filter((key) => videos[key].owner === card);
  const countLikes = userArrayKeys.reduce((acc, key) => {
    return acc = acc + videos[key].users.length
  }, 0)

  const UsersAttribute = ({ text, value, children, ...restProps }) => {
    return (
      <div className="users-card__attribute-container" {...restProps}>
        <p className="users-card__text-attribute">{text}:</p>
        <p className="users-card__text-attribute">{value}</p>
        {children}
      </div>
    )
  }

  const USERS_ATTRIBUTES = [
    { text: "Email", value: users[card].email, key: "email" },
    { text: "Регистрация", value: verifyDate(users[card].atRegistration), key: "registration" },
    { text: "Поставил лайков", value: users[card].videos.length, key: "postLikes" },
    { text: "Добавил видео", value: countAddVideo, key: "addVideos" },
    { text: "Последний вход", value: verifyDate(users[card].atLastEntry), key: "lastEntry" },
    { text: "Собрал лайков", value: countLikes, key: "getLikes" },
  ]

  const toggleRole = async (role) => {
    const roles = users[card].roles;
    console.log(roles, role);
    let newRoles = [];
    if (roles.includes(role)) {
      newRoles = roles.filter((x) => x !== role)
    } else {
      newRoles = [...roles, role];
    }
    await updateRoles(dispatch, card, newRoles);
  }

  const UserRole = ({ role }) => {
    const classNameRole = users[card].roles.includes(role) ? "users-card__role_yes" : "";
    return (
      <CustomButton
        text={role}
        ariaLabel={role}
        className={`users-card__role ${classNameRole}`}
        disabled={role === "USER"}
        onClick={() => toggleRole(role)}
      />

    )
  }

  const ROLES = ["BLOCKED", "USER", "ADMIN", "SUPERUSER"]



  return (
    <li className="users-card">
      <h2 className="users-card__name">{users[card].name}</h2>
      <ul className="users-card__attributes">
        {USERS_ATTRIBUTES.map((item) => (
          <li
            key={item.key}
            className="card__attribute-container"
          >
            <UsersAttribute
              text={item.text}
              value={item.value}
            />
          </li>
        ))}
      </ul>
      <ul className="users-card__roles">
        {isAdmin &&
          ROLES.map((item) => (
            <li key={item}>
              <UserRole
                role={item}
              />
            </li>
          ))
        }
      </ul>

    </li>
  );

}