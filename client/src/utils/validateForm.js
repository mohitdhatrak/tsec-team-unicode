export function validateForm(data, setFeedback, formType) {
    const email = data.get("email");
    const password = data.get("password");
    const name = data.get("name");
    const phone = data.get("phone");
    const pincode = data.get("pincode");
    const confirmPassword = data.get("confirmPassword");

    const regexEmail =
        /^[\w#!%\$'&\+\*-/\?\^`\.\{\|\}~=]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+$/;

    const regexPhone = /^(0|\+?91 ?)?[6-9][0-9]{4} ?[0-9]{5}$/;

    const regexPassword =
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=\S+$).*$/;

    if (
        name?.trim() === "" ||
        email.trim() === "" ||
        phone?.trim() === "" ||
        pincode?.trim() === "" ||
        password?.trim() === "" ||
        confirmPassword?.trim() === ""
    ) {
        setFeedback("Please fill all compulsory fields!");
        return false;
    }

    if (formType === "forgotPass") {
        if (
            !regexEmail.test(email.trim()) ||
            email.startsWith(".") ||
            email.endsWith(".") ||
            email.endsWith("-") ||
            email.includes("..") ||
            email.includes(".@") ||
            email.includes("@-")
        ) {
            setFeedback("Please enter a valid email!");
            return false;
        }
        return true;
    }

    if (
        !regexEmail.test(email.trim()) ||
        email.startsWith(".") ||
        email.endsWith(".") ||
        email.endsWith("-") ||
        email.includes("..") ||
        email.includes(".@") ||
        email.includes("@-")
    ) {
        setFeedback("Please enter a valid email!");
        return false;
    } else if (
        formType === "signup" &&
        phone?.trim() !== "" &&
        !regexPhone.test(phone?.trim())
    ) {
        setFeedback("Please enter a valid phone number!");
        return false;
    } else if (password.trim().length < 8) {
        setFeedback("Password must be atleast 8 characters long!");
        return false;
    } else if (!regexPassword.test(password.trim())) {
        setFeedback(
            "Password must contain atleast 1 special character, 1 numeric value and 1 uppercase & lowercase letter each!"
        );
        return false;
    } else if (formType === "signup" && password !== confirmPassword) {
        setFeedback("Passwords don't match!");
        return false;
    }

    return true;
}
