import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { Grid } from "semantic-ui-react"
import { useStore } from "../../stores/store"
import LoadingComponents from "../LoadingComponents"
import ActivityDetailedChat from "./ActivityDetailedChat"
import ActivityDetailedInfo from "./ActivityDetailedInfo"
import ActivityDetailedSidebar from "./ActivityDetailedSidebar"
import ActivityDetailedHeader from "./ActivityDetaledHeader"

const ActivityDetials = () => {

    const {activityStore} = useStore()
    const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore
    const {id} = useParams<{id: string}>()

    useEffect(() => {
        if(id) {
            loadActivity(id)
        }
    }, [id, loadActivity])

    if(loadingInitial || !activity) return <LoadingComponents />

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity} />
                <ActivityDetailedInfo activity={activity} />
                <ActivityDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSidebar activity={activity} />
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDetials) 