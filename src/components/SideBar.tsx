import { memo, useEffect, useState } from "react";
import { Button } from "./Button";

import { api } from "../services/api";

interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface ISideBar {
  selectedGenderId: number;
  onSelectGender: (id: number) => void;
}

function SideBarComponent({ selectedGenderId, onSelectGender }: ISideBar) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => onSelectGender(genre.id)}
            selected={selectedGenderId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}

export const SideBar = memo(SideBarComponent, (prev, next) => {
  return prev.selectedGenderId === next.selectedGenderId;
});
