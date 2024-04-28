import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { Article } from "../../types/types";

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async () => {
    const { data } = await axios.get("/articles");
    return data;
  }
);

export const createArticle = createAsyncThunk<any>(
  "article/createArticle",
  async (params) => {
    console.log(params);
    // const { data } = await axios.post("/articles");
    // return data;
  }
);

// type paramsCreate = {
//   title: string;
//   description: string;
//   photos?: string[] | [];
// };

// interface Article {
//   articleId: string;
//   title: string;
//   description: string;
//   articleStatusId?: string | null;
//   photos?: string[] | [];
//   createdAt: Date;
//   updatedAt: Date;
//   userId: string;
//   User?: {
//     userId: string;
//     lastName: string;
//     firstName: string;
//   };
// }

interface ArticleState {
  articles: Article[] | [];
  status: string;
}

const initialState: ArticleState = {
  articles: [],
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
      });
    // .addCase(createArticle.fulfilled, (state: ArticleState, action) => {
    //   if (state.articles === null) {
    //     state.articles = [action.payload];
    //   } else {
    //     state.articles.push(action.payload);
    //   }
    //   state.status = "loaded";
    // })
    // .addCase(createArticle.rejected, (state) => {
    //   state.status = "error create";
    // });
  },
});

export const articleReducer = articleSlice.reducer;
