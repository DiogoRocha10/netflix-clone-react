import React, { useEffect, useState } from "react";

import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";

import Tmdb from "./Tmdb";
import "./App.css";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  useEffect(() => {
    //PEGANDO A LISTA
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);
      //PEGANDO O DESTAQUE
      let originals = list.filter((i) => i.slug === "originals");
      let randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      );
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "tv");
      setFeaturedData(chosenInfo);
    };
    loadAll();
  }, []);

  return (
    <div className="page">
      {featuredData && <FeaturedMovie item={featuredData} />}
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
    </div>
  );
};