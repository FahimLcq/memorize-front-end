import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const EDIT_TRAINING_CARDS = "EDIT_TRAINING_CARDS";

export const editTrainingCards = createAsyncThunk(
  EDIT_TRAINING_CARDS,
  async ({ deckId, cardId, newCardsTest }) => {
    const userId = localStorage.getItem("id");

    if (userId) {
      const response = await axios.patch(
        `${
          import.meta.env.VITE_API_URL
        }/account/${userId}/decks/${deckId}/cards/${cardId}`,
        newCardsTest,
        {
          headers: {
            authorization: localStorage.getItem("accessToken"),
          },
        }
      );

      console.log(response);
      console.log("Hello: ", response.data);

      return response.data;
    } else {
      console.log("updatedCard is null or undefined");
    }
  }
);
