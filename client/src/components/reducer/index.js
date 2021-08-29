export const initialUserState = {
    userEmail: "",
    fullName: "",
    phoneNumber: "",
    address: "",
    city: "",
    pincode: "",
    count: 0,
    imageUrl: "",
    password: "",
    toDate: "",
    fromDate: "",
    rentCity:"",
}

export const userReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case "SET_USER_DETAILS":
            return ({
                ...state,
                userEmail: payload.email,
                fullName: payload.fullName,
                phoneNumber: payload.phoneNumber,
                address: payload.address,
                city: payload.city,
                pincode: payload.pincode,
            })
        case "TEMP_DETAILS":
            return ({
                ...state,
                userEmail: payload.email,
                fullName: payload.fullName,
                phoneNumber: payload.phoneNumber,
                address: payload.address,
                city: payload.city,
                pincode: payload.pincode,
                password:payload.password,
            })
        case "CLEAR_USER":
            return initialUserState
        case "OTP_FAILED":
            return ({
                ...state,
                count:state.count+1,
            })
        case "LOGIN_SUCESS":
            return ({
                ...state,
                userEmail: payload.email,
            });
        case "SET_IMAGE":
            console.log(payload);
            return ({
                ...state,
                imageUrl:payload.imageUrl
            })
        case "SEARCH_CAR":
            console.log(payload);
            return ({
                toDate: payload.toDate,
                fromDate: payload.fromDate,
                rentCity:payload.rentCity,
            })
        default:
            return state;
    }
}