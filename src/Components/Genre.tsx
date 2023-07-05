import React, { useContext } from "react";
import { ThemeContext } from "./context/ViewMode";

type GenreButtonsProps = {
  onSelection: (selectedGenres: string[]) => void;
};

export default function Genre({ onSelection }: GenreButtonsProps) {
  //destructuring the onSelection function so useEffect works properly
  //otherwise it would trigger everytime props.anything changed
  const genresData: string[] = [
    "Fantasy",
    "Science fiction",
    "Dystopian",
    "Adventure",
    "Romance",
    "Detective & mystery",
    "Horror",
    "Thriller",
    "LGBTQ+",
    "Young Adult",
    "Children's fiction",
    "Biography",
    "Cooking",
    "Art & Photography",
    "Self-Help",
    "Health & Fitness",
    "Motivational",
    "History",
    "True Crime",
  ];

  const { mode } = useContext(ThemeContext);

  const [selectedGenres, setSelectedGenres] = React.useState<string[]>([]);

  React.useEffect(() => {
    onSelection(selectedGenres);
  }, [selectedGenres, onSelection]);

  function handleGenreClick(genre: string) {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  }

  return (
    <div className="genreDataContainer">
      {genresData.map((genre: string) => (
        <button
          key={genre}
          onClick={() => handleGenreClick(genre)}
          className={`genreButton ${mode}`}
          style={{
            backgroundColor: selectedGenres.includes(genre)
              ? mode === "light"
                ? "#c79ec1"
                : "#6D626C"
              : "",
            color: selectedGenres.includes(genre) ? "white" : "",
          }}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}
