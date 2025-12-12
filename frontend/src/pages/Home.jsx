import React, { useEffect, useState } from "react";

const DATA_URL = "https://olsonbenn.github.io/Secure-Web-Midterm-Project/Midterm/data.JSON";

export default function Home() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(DATA_URL)
      .then((r) => r.json())
      .then((data) => {
        setCards(data.pages.index || []);
      })
      .catch((err) => {
        console.error("Failed to fetch data:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="text-center my-4">
        <h1>Welcome to Secure Web Games</h1>
        <p className="lead">Choose a game from the navigation bar above.</p>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border" role="status" />
        </div>
      ) : (
        <div className="row" id="card-container">
          {cards.map((game, idx) => (
            <div key={idx} className="col-sm-6 col-md-4 col-lg-3">
              <div className="card mb-4" style={{ width: "100%" }}>
                <img src={game.imageurl} className="card-img-top" alt={`${game.title}`} />
                <div className="card-body">
                  <h5 className="card-title">{game.title}</h5>
                  <p className="card-text">
                    <strong>Year:</strong> {game.year}
                    <br />
                    <strong>Wikipedia:</strong>{" "}
                    <a href={game.wikiurl} target="_blank" rel="noreferrer">{game.wikiurl}</a>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
