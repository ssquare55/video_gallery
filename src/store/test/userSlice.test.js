import reducer, { clearLoginStatus } from '../userSlice'

// checking the initial state
it("it should return initial state of userslice", () => {
    expect(reducer(undefined, {})).toEqual({
        userObj: {},
        isSuccess: false,
        isLoading: false,
        isError: false,
        invalidLoginMessage: ""
    });
});


// checking the state after logout
it("should clear login state while logout", () => {
    expect(
        reducer(
            {
                userObj: { name: "xyz" },
                isSuccess: true,
            },
            clearLoginStatus()
        )
    ).toEqual({
        userObj: {},
        isSuccess: false,
    });
});