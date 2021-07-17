import { User, UserInput } from "./userModels";

export function asUserInput(user: User) {
    let userInput: UserInput = {
        username: user.username,
        password: user.password,
        fullName: user.fullName,
    };
    return userInput;
}
