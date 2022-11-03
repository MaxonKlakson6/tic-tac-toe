import styles from "./styles.module.css";
const Board = () => {
  const mock = ["X", "O", "X", "O", "X", "O", "", "", ""];
  return (
    <div className={styles.board}>
      {mock.map((item) => (
        <div className={styles.cell}>{item}</div>
      ))}
    </div>
  );
};

export default Board;
