import { Form, Formik } from "formik"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { Button, Header, Segment } from "semantic-ui-react"
import { v4 as uuid } from 'uuid'
import * as yup from "yup"
import { IActivity } from "../../models/activity"
import { useStore } from "../../stores/store"
import { categoryOptions } from "./categoryOptions"
import MyDateInput from "./MyDateInput"
import MySelectInput from "./MySelectInput"
import MyTextArea from "./MyTextArea"
import MyTextInput from "./MyTextInput"
import LoadingComponents from "../LoadingComponents"

const ActivityForm = () => {

    const history = useHistory()
    const {activityStore} = useStore()
    const {createActivity, updateActivity, loading, loadActivity, loadingInitial} = activityStore
    const {id} = useParams<{id: string}>()

    const [activity, setActivity] = useState<IActivity>({
        id: "",
        title: "",
        category: "",
        description: "",
        date: null,
        city: "",
        venue: ""
    })

    const validationSchema = yup.object({
        title: yup.string().required("The activity title is required"),
        description: yup.string().required("The activity description is required"),
        category: yup.string().required(),
        date: yup.string().required("Date is required").nullable(),
        venue: yup.string().required(),
        city: yup.string().required()
    })

    useEffect(() => {
        if(id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity])

    const handleFormSubmit = (activity: IActivity) => {
        if(activity.id.length === 0) {
            let newActivity = {
                ...activity, id: uuid()
            }

            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
        } else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
        }
    }


    if(loadingInitial) return <LoadingComponents content="Loading activity..." />

    return (
        <Segment clearing>
            <Header content="Activity Details" sub color="teal" />
            <Formik validationSchema={validationSchema} enableReinitialize initialValues={activity} onSubmit={values => handleFormSubmit(values)}>
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                        <MyTextInput name="title" placeholder="Title" />
                        <MyTextArea rows={3} placeholder="Description" name="description" />
                        <MySelectInput options={categoryOptions} placeholder="Category" name="category" />
                        <MyDateInput placeholderText="Date" name="date" showTimeSelect timeCaption="time" dateFormat="MMMM d, yyyy h:mm aa" />
                        <Header content="Location Details" sub color="teal" />
                        <MyTextInput placeholder="City" name="city" />
                        <MyTextInput placeholder="Venue" name="venue" />
                        <Button loading={loading} floated="right" positive type="submit" content="Submit" disabled={isSubmitting || !dirty || !isValid} />
                        <Button as={Link} to="/activities" floated="right" type="button" content="Cancel" />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
}

export default observer(ActivityForm) 