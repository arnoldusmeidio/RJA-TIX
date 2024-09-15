import { Seat } from "@/types";
import { useReducer } from "react";

type State = {
  selectedSeats: Seat[];
};

type ToggleAction = {
  type: "toggleSeat";
  payload: Seat;
};
type ResetAction = {
  type: "reset";
};
type Action = ToggleAction | ResetAction;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "toggleSeat": {
      const existingSelection = state.selectedSeats.find(
        (selectedSeat) =>
          action.payload?.column === selectedSeat.column &&
          action.payload?.row === selectedSeat.row
      );

      if (existingSelection) {
        return {
          ...state,
          selectedSeats: state.selectedSeats.filter(
            (seat) =>
              !(
                seat.column === action.payload.column &&
                seat.row === action.payload.row
              )
          ),
        };
      } else {
        return {
          ...state,
          selectedSeats: [...state.selectedSeats, action.payload],
        };
      }
    }
    case "reset": {
      return {
        ...state,
        selectedSeats: [],
      };
    }
    default:
      return state;
  }
};

export const useSeatSelection = () => {
  const [state, dispatch] = useReducer(reducer, { selectedSeats: [] });

  const toggleSeat = (seat: Seat) => {
    dispatch({ type: "toggleSeat", payload: seat });
  };
  const resetSeats = () => {
    dispatch({ type: "reset" });
  };
  return { state, toggleSeat, resetSeats };
};
