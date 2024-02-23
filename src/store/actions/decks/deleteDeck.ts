import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { EditDeckProps } from "../../reducers/decks";

export const DELETE_DECK = "DELETE_DECK";

export const deleteDeck = createAsyncThunk<any, Partial<EditDeckProps>>(
  DELETE_DECK,
  async (deckId) => {
    const userId = localStorage.getItem("id");

    if (userId) {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/account/${userId}/decks/${deckId}`
      );

      console.log(response);
      console.log("Hello: ", response.data);

      return response.data;
    } else {
      console.log("userId est null ou undefined");
    }
  }
);
