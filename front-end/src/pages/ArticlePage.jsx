import { useState } from 'react';
import { useParams, useLoaderData } from 'react-router-dom';
import axios from 'axios';
import CommentsList from '../CommentsList';
import AddCommentForm from '../AddCommentForm';
import articles from '../article-content';
import useUser from '../useUser';
import DecisionTreesContent from '../components/DecisionTreesContent';
import LogisticRegressionContent from '../components/LogisticRegressionContent';
import KMeansClusteringContent from '../components/KMeansClusteringContent';
import { API_URL } from '../config';

export default function ArticlePage() {
  const { name } = useParams();
  const { upvotes: initialUpvotes, comments: initialComments } = useLoaderData();
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [comments, setComments] = useState(initialComments);

  const { isLoading, user } = useUser();

  const article = articles.find(a => a.name === name);

  async function onUpvoteClicked() {
    const token = user && await user.getIdToken();
    const headers = token ? { authtoken: token } : {};
    const response = await axios.post(`${API_URL}/api/articles/${name}/upvote`, null, { headers });
    const updatedArticleData = response.data;
    setUpvotes(updatedArticleData.upvotes);
  }

  async function onAddComment({ nameText, commentText }) {
    const token = user && await user.getIdToken();
    const headers = token ? { authtoken: token } : {};
    const response = await axios.post(`${API_URL}/api/articles/${name}/comments`, {
      postedBy: nameText,
      text: commentText,
    }, { headers });
    const updatedArticleData = response.data;
    setComments(updatedArticleData.comments);
  }

  const renderArticleContent = () => {
    if (article.isRichContent) {
      if (article.name === 'decision-trees') {
        return <DecisionTreesContent />;
      }
      if (article.name === 'logistic-regression') {
        return <LogisticRegressionContent />;
      }
      if (article.name === 'kmeans-clustering') {
        return <KMeansClusteringContent />;
      }
    }
    return (
      <>
        <h1>{article.title}</h1>
        {article.content.map(p => <p key={p}>{p}</p>)}
      </>
    );
  };

  return (
    <>
    {renderArticleContent()}
    {user && <button onClick={onUpvoteClicked}>Upvote</button>}
    <p>This article has {upvotes} upvotes</p>
    {user
      ? <AddCommentForm onAddComment={onAddComment} />
      : <p>Log in to add a comment</p>}
    <CommentsList comments={comments} />
    </>
  );
}

export async function loader({ params }) {
  const API_URL = import.meta.env.PROD ? 'https://api.aleaportfolio.com' : '';
  const response = await axios.get(`${API_URL}/api/articles/${params.name}`);
  const { upvotes, comments } = response.data;
  return { upvotes, comments };
}