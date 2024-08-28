import { User } from "@/types/user";
import { create } from "zustand";

type UserStore = {
  users: User[];
  user: User | null;
  fetchUser: (users: User[]) => void;
  editUser: (user: User) => void;
  removeUser: (user: User) => void;
  showUser: (id: number) => void;
  resetUser: () => void;
  createUser: (user: User) => void;
};

const useUserStore = create<UserStore>((set) => ({
  users: [],
  user: null,
  /**
   * Updates an existing user in the store.
   *
   * @param {User} newUser - The updated user object.
   * @return {void}
   */
  editUser: (newUser: User) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === newUser.id ? newUser : user
      ),
    })),
  /**
   * Removes a user from the store.
   *
   * @param {User} user - The user object to be removed.
   * @return {void}
   */
  removeUser: (user: User) =>
    set((state) => ({
      users: state.users.filter((item) => item.id !== user.id),
    })),
  /**
   * Finds and sets the user object in the state based on the provided user ID.
   *
   * @param {number} id - The ID of the user to be displayed.
   * @return {void} This function does not return a value.
   */
  showUser: (id: number) =>
    set((state) => ({ user: state.users.find((item) => item.id === id) })),
  fetchUser: (users: User[]) => set({ users }),
  resetUser: () => set({ user: null }),
  createUser: (user: User) =>
    set((state) => ({ users: [...state.users, user] })),
}));

export default useUserStore;
