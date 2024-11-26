import { useState } from 'react'
import MonthlyView from '../components/MonthlyView'
import DailyView from '../components/DailyView'
import { ViewType } from '../codes/Type'

const Home = () => {
    const [selectedView, setViewType] = useState(ViewType.MONTHLY)
    
    return (
    <div> 
        {selectedView === ViewType.MONTHLY ? <MonthlyView /> : <DailyView />}
    </div>
    )
}

export default Home