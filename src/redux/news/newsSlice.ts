import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type News = {
  source: {
    id: null | string,
    name: null | string
  },
  author: null | string,
  title: string,
  description: string,
  url: string,
  urlToImage: null | string,
  publishedAt: string
  content: string
};


type NewsState = {
  articles: News[] | [];
}

const initialState: NewsState = {
  articles: [],
}

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    addNews(state, action: PayloadAction<News[]>) {
      state.articles = [...state.articles, ...action.payload]
    },
    removeNews(state, action: PayloadAction<string>) {
      state.articles = state.articles.filter(article => article.title !== action.payload);
    }
  },
});

export const { addNews, removeNews } = newsSlice.actions;

export default newsSlice.reducer;