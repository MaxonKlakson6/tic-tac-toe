import { FC } from "react";

import styles from "./styles.module.css";

interface RoomItemProps {
  roomName: string;
  count: 0 | 1 | 2;
  id: string;
  onStartJoin: (id: string) => void;
}

const RoomItem: FC<RoomItemProps> = ({ roomName, count, id, onStartJoin }) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.heading}>{roomName}</p>
      <p className={styles.usersCount}>
        {count > 0 ? `${count} users in room` : "Empty room"}
      </p>
      <div style={{ borderTop: "1px solid red" }}>
        <button
          className={styles.joinRoomButton}
          onClick={() => onStartJoin(id)}
        >
          Join room
        </button>
      </div>
    </div>
  );
};

export default RoomItem;
