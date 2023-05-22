import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../utils/api";

//типизируем стандартные хуки под наше приложение
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: RootState
    dispatch: AppDispatch
    rejectWithValue: string
    extra: Api
  }>()