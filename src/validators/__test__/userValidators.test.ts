import { UserSchema } from "../userValidators";

describe("User Validator", () => {
  it("should return same object for valid data", () => {
    const user = {
      user_id: 5,
      name: "MukeshKannan",
      email: "mukeshkannan@gmail.com",
      clg_name: "Chennai Institute of Technology",
      phone_no: "0123456789",
    };
    const parsedUser = UserSchema.parse(user);
    expect(parsedUser).toEqual({
      user_id: 5,
      name: "MukeshKannan",
      email: "mukeshkannan@gmail.com",
      clg_name: "Chennai Institute of Technology",
      phone_no: "0123456789",
    });
  });
});
