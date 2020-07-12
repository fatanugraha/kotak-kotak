import { useSelector, shallowEqual } from "react-redux";

export const usePlayer = () => {
  return useSelector((state) => state.player, shallowEqual);
};
