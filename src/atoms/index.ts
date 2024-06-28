import { atom } from "recoil";

export const AccountAtom = atom<string>({
  key: "account",
  default: "",
});

export type User = {
  id: string;
  role: 0 | 1 | null;
};

export const currentUser = atom<User | null>({
  key: "currentUser",
  default: null,
});
