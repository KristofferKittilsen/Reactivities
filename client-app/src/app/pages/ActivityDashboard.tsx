import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { Grid } from "semantic-ui-react"
import ActivityFilters from "../components/activity/ActivityFilters"
import ActivityList from "../components/activity/ActivityList"
import LoadingComponents from "../components/LoadingComponents"
import { useStore } from "../stores/store"


const ActivityDashboard = () => {

    const {activityStore} = useStore()
    const {loadActivities, activityRegistry} = activityStore
  
    useEffect(() => {
      if(activityRegistry.size <= 1) loadActivities()
    }, [activityRegistry.size, loadActivities])
  
    if(activityStore.loadingInitial) return <LoadingComponents content="Loading activities..." />

    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList />
            </Grid.Column>
            <Grid.Column width="6">
                <ActivityFilters />
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard) 