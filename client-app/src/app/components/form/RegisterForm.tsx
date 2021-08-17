import { ErrorMessage, Form, Formik } from "formik"
import { observer } from "mobx-react-lite"
import { Button, Header } from "semantic-ui-react"
import * as yup from "yup"
import { useStore } from "../../stores/store"
import ValidationErrors from "../ValidationErrors"
import MyTextInput from "./MyTextInput"


const RegisterForm = () => {

    const {userStore} = useStore()

    return (
        <Formik 
            initialValues={{displayName: "", username: "", email: "", password: "", error: null}} 
            onSubmit={(values, {setErrors}) => userStore.register(values).catch(error => setErrors({error}))}
            validationSchema={yup.object({
                displayName: yup.string().required(),
                username: yup.string().required(),
                email: yup.string().required().email(),
                password: yup.string().required(),
            })}
        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
                    <Header as="h2" content="Sign up to Reactivities" color="teal" textAlign="center" />
                    <MyTextInput name="displayName" placeholder="Display Name" />
                    <MyTextInput name="username" placeholder="Username" />
                    <MyTextInput name="email" placeholder="Email" />
                    <MyTextInput name="password" placeholder="Password" type="password" />
                    <ErrorMessage name="error" render={() => <ValidationErrors errors={errors.error} />} />
                    <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive content="Register" type="submit" fluid />
                </Form>
            )}
        </Formik>
    )
}

export default observer(RegisterForm) 