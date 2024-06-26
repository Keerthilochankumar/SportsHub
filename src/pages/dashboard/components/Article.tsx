import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';

type Article = {
  id: number;
  title: string;
  thumbnail: string;
  sport: {
    id: number;
    name: string;
  };
  date: string;
  summary: string;
  content: string;
  teams: Array<{
    id: number;
    name: string;
  }>;
};

const ArticleComponent: React.FC<{ article: Article; onClick: () => void }> = ({ article, onClick }) => {
  return (
    <div className="article flex border-2 border-black m-2 cursor-pointer" onClick={onClick}>
      <img src={article.thumbnail} alt={article.title} className="w-1/6 h-auto mr-2" />
      <div className="flex flex-col justify-between ml-2 w-70">
        <div>
          <div className="text-lg">{article.title}</div>
          <div className="text-sm">{article.summary}</div>
        </div>
        <div className="text-xs text-gray-500 mt-2">{article.date}</div>
      </div>
    </div>
  );
};

const ArticleDetailsPopup: React.FC<{ article: Article; onClose: () => void }> = ({ article, onClose }) => {
  return (
    <Dialog open={true} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="bg-white p-5 rounded shadow-lg w-3/4 max-w-xl overflow-auto max-h-full relative">
        <button className="absolute top-2 right-2" onClick={onClose}>Close</button>
        <h2 className="text-xl mb-2">{article.title}</h2>
        <img src={article.thumbnail} alt={article.title} className="w-full h-auto mb-2" />
        <div className="mb-2"><strong>Sport:</strong> {article.sport.name}</div>
        <div className="mb-2"><strong>Date:</strong> {article.date}</div>
        <div className="mb-2"><strong>Summary:</strong> {article.summary}</div>
        <div className="mb-2"><strong>Content:</strong> {article.content}</div>
        <div><strong>Teams:</strong> {article.teams.map(team => team.name).join(', ')}</div>
      </div>
    </Dialog>
  );
};

const Articles: React.FC<{ sport: string }> = ({ sport }) => {
  const [articles, setArticles] = useState<Article[] | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [preferencesData, setPreferencesData] = useState<{ [key: string]: boolean }>({});
  const [filteredArticles, setFilteredArticles] = useState<Article[] | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const fetchArticles = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/articles`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const articleData = await response.json();
      setArticles(articleData as unknown as Article[]);
    } catch (error) {
      console.error("Error occurred when fetching articles:", error);
    }
  };

  const fetchArticleDetails = async (id: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/articles/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const articleData = await response.json();
      setSelectedArticle(articleData as Article);
    } catch (error) {
      console.error("Error occurred when fetching article details:", error);
    }
  };

  const handlePreferences = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/user/preferences`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('token')}` }
      });
      const preferences = await response.json();
      setPreferencesData(preferences.preferences);
      if (response.ok) {
        console.log("Preferences updated successfully");
      }
    } catch (error) {
      console.error("Error occurred when updating preferences:", error);
    }
  }

  useEffect(() => {
    fetchArticles();
    handlePreferences();
    setLoggedIn(!!localStorage.getItem('token'));
  }, []);

  useEffect(() => {
    if (loggedIn) {
      if (Object.keys(preferencesData).length !== 0) {
        const filtered = articles?.filter(article => preferencesData[article.sport.name]);
        setFilteredArticles(filtered || []);
      } else {
        setFilteredArticles(articles || []);
      }
    } else {
      setFilteredArticles(articles);
    }
  }, [preferencesData, articles, loggedIn]);

  return (
    <div className="flex flex-col">
      <div className="w-full mt-2">
        {filteredArticles?.map((article) => (
          <ArticleComponent
            article={article}
            key={article.id} // Use a unique identifier like article.id
            onClick={() => fetchArticleDetails(article.id)}
          />
        ))}
      </div>
      {selectedArticle && (
        <ArticleDetailsPopup article={selectedArticle} onClose={() => setSelectedArticle(null)} />
      )}
    </div>
  );
};

export default Articles;
