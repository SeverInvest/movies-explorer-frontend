import { useSelector } from 'react-redux';
import UsersCard from "../UsersCard";
import "./style.scss";

export default function UsersCardList() {

const cards = useSelector(state => state.users.keys);
const users = useSelector(state => state.users.users);

const sortedCards = [...cards];
sortedCards.sort((a, b) => {
  if (users[a].name > users[b].name) { return 1 };
  return -1;
});

  return (
    <section aria-label="Раздел с карточками пользователей" className="users-cards">
      <ul className="users-cards__list">
        {sortedCards.map((card) => (
          <UsersCard
            key={card}
            card={card}
          />
        ))}
      </ul>
    </section>
  );
}