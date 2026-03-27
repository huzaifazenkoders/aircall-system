import React from "react";

export type ReactDispatch<T> = React.Dispatch<React.SetStateAction<T>>;

export type VoidFunctionWithBooleanArg = (_args: boolean) => void;
