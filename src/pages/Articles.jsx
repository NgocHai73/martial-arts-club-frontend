import { useState, useEffect } from "react";
import axios from "axios";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get("/api/articles").then((res) => setArticles(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Bài Viết</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id} className="border p-4 mt-4">
            <h2 className="font-bold">{article.title}</h2>
            <p>{article.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Articles;
