import { Space } from "antd"
import elevation from '../../assets/plots/RESULTS/PLOTS_AFTER_ELIMINTATING_OUTLIERS/elevation300.PNG'
import elevationWithLandslide from '../../assets/plots/RESULTS/PLOTS_AFTER_ELIMINTATING_OUTLIERS/elevation_violin.PNG'
import energy from '../../assets/plots/RESULTS/PLOTS_AFTER_ELIMINTATING_OUTLIERS/energy.PNG'
import energyWithLandslide from '../../assets/plots/RESULTS/PLOTS_AFTER_ELIMINTATING_OUTLIERS/energy_violin.PNG'
import precipitation from '../../assets/plots/RESULTS/PLOTS_AFTER_ELIMINTATING_OUTLIERS/precipitation.PNG'
import precipiWithLandslide from '../../assets/plots/RESULTS/PLOTS_AFTER_ELIMINTATING_OUTLIERS/precipitation_violin.PNG'
import slope from '../../assets/plots/RESULTS/PLOTS_AFTER_ELIMINTATING_OUTLIERS/slope.PNG'
import slopeWithLandslide from '../../assets/plots/RESULTS/PLOTS_AFTER_ELIMINTATING_OUTLIERS/violin_slope.PNG'
const Plot3 = () => {
    return(
        <>
            <Space>
                <img style={{width:'100%'}} src={elevation} />
                <img style={{width:'100%'}} src={elevationWithLandslide} />
                <img style={{width:'100%'}} src={energy} />
                <img style={{width:'100%'}} src={energyWithLandslide} />
            </Space>
            <Space>
                <img style={{width:'100%'}} src={precipitation} />
                <img style={{width:'100%'}} src={precipiWithLandslide} />
                <img style={{width:'100%'}} src={slope} />
                <img style={{width:'100%'}} src={slopeWithLandslide} />
            </Space>
        </>
    )

}

export default Plot3