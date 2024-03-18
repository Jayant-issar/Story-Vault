import axios from 'axios';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../config';

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/blog/bulk`, {
      headers: {
        authorization: "Bearer" + " " + localStorage.getItem('token')
      }
    }).then((response) => {
      setBlogs(response.data.allBlogs);
      setLoading(false);
    });
  }, []);

  return {
    loading,
    blogs
  };
};

export default useBlogs;
