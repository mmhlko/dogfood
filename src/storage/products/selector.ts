import { RootState } from "../types";
import { sliceName } from "./products-slice";

//вместо sliceName подставляется поле products из стейта
export const getProducts = (state: RootState) => state[sliceName].data;