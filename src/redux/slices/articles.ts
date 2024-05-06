import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getArticles, postNewArticle, removeArticle } from "../../axios";
import { Article } from "../../types/types";

export type paramsCreate = {
  title: string;
  description: string;
  photos?: string[];
};

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async () => {
    const { data } = await getArticles();
    return data;
  }
);

export const fetchUserArticles = createAsyncThunk(
  "articles/fetchUserArticles",
  async (userId: string) => {
    const { data } = await getArticles(userId);
    return data;
  }
);

export const createArticle = createAsyncThunk(
  "article/createArticle",
  async (params: paramsCreate) => {
    console.log(params);
    const { data } = await postNewArticle(params);
    return data;
  }
);
export const deleteArticle = createAsyncThunk(
  "article/delete",
  async (articleId: string) => {
    await removeArticle(articleId);
  }
);

interface ArticleState {
  articles: Article[];
  status: string;
  userArticles: Article[];
}

const initialState: ArticleState = {
  articles: [],
  userArticles: [],
  status: "loading",
};

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state: ArticleState) => {
        state.articles = [];
        state.status = "loading";
      })
      .addCase(fetchArticles.fulfilled, (state: ArticleState, action) => {
        state.articles = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchArticles.rejected, (state) => {
        state.articles = [];
        state.status = "error arcicles";
      })
      .addCase(createArticle.pending, (state: ArticleState) => {
        state.articles = [];
        state.status = "loading creating";
      })
      .addCase(createArticle.fulfilled, (state: ArticleState, action) => {
        state.articles.push(action.payload);
        state.status = "loaded";
      })
      .addCase(createArticle.rejected, (state) => {
        state.status = "error create";
      })
      .addCase(fetchUserArticles.pending, (state: ArticleState) => {
        state.userArticles = [];
        state.status = "loading";
      })
      .addCase(fetchUserArticles.fulfilled, (state: ArticleState, action) => {
        state.userArticles = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchUserArticles.rejected, (state) => {
        state.userArticles = [];
        state.status = "error arcicles";
      })
      .addCase(deleteArticle.pending, (state: ArticleState) => {
        state.status = "loading";
      })
      .addCase(deleteArticle.fulfilled, (state: ArticleState, action) => {
        state.userArticles = state.userArticles.filter(
          (a) => a.articleId !== action.meta.arg
        );
        state.status = "loaded";
      });
  },
});

export const getUserArticles = (state: { articles: ArticleState }) =>
  state.articles.userArticles;

export const articleReducer = articleSlice.reducer;
