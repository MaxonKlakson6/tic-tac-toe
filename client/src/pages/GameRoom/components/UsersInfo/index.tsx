import { FC } from "react";

import { User } from "../../types";

import styles from "./styles.module.css";

interface UsersInfoProps {
  users: User[] | undefined;
  player: User | null;
}

const UsersInfo: FC<UsersInfoProps> = ({ users, player }) => {
  return (
    <aside className={styles.wrapper}>
      {users &&
        users.map((user) => (
          <p key={user.id} className={styles.userInfo}>
            {user.id === player?.id
              ? `Your symbol: ${user.symbol}`
              : `${user.name}: ${user.symbol}`}
          </p>
        ))}
    </aside>
  );
};

export default UsersInfo;
