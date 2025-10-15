import * as Yup from 'yup';

//To check form field validation
export const RegistrationSchema = Yup.object().shape({
    userName: Yup.string().required('User Name is Required'),
    email: Yup.string().email('Invalid email format').required('Email is Required'),
    password: Yup.string().required("Password is Required"),
    confirmPassword: Yup.string().required("Confirm password is Required").oneOf([Yup.ref("password"), null], "confirm password and password must match"),
})

export const UpdateUserDetailSchema = Yup.object().shape({
    userName: Yup.string().required('User Name is Required'),
    email: Yup.string().email('Invalid email format').required('Email is Required'),
    password: Yup.string().required("Password is Required"),
})

export const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is Required'),
    password: Yup.string().required("Password is Required"),
})

export const AddPostSchema = Yup.object().shape({
    image: Yup.mixed()
        .required("Image is Required")
        .test("fileType", "Unsupported File Format", (value) => {
            if (!value && !value[0]) return false;
            return ["image/jpg", "image/jpeg", "image/png"].includes(value[0].type);
        })
        .test("fileSize", "File too large, max 2MB", (value) => {
            const file = value && value[0];
            // console.log("file", file);

            if (!file) return false;
            return file.size <= 2 * 1024 * 1024; // 2MB
        }),
    title: Yup.string().required("Title is Required"),
    description: Yup.string().required("Description is Required"),
})