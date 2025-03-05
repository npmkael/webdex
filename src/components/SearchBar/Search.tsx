import styles from "./Search.module.css";

type Props = {};

const Search = () => {
  return (
    <div className={styles["pokedex-section__search-bar"]}>
      <input
        className={styles["pokemon-section__search-bar-input"]}
        type="text"
        placeholder="Search your pokémon!"
      />
      <button type="submit" className={styles["search-btn"]}>
        <span>s</span>
      </button>
    </div>
  );
};

export default Search;
