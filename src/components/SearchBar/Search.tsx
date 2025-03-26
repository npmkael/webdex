import styles from "./Search.module.css";
import { useSearch } from "../../context/SearchContext";

const Search = () => {
  const { handleSubmit, setSearchTerm, searchTerm } = useSearch();

  return (
    <form
      onSubmit={handleSubmit}
      className={styles["pokedex-section__search-bar"]}
    >
      <input
        className={styles["pokemon-section__search-bar-input"]}
        type="text"
        placeholder="Search your pokémon!"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className={styles["search-btn"]}>
        <span>s</span>
      </button>
    </form>
  );
};

export default Search;
