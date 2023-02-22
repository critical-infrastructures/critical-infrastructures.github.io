import { Space } from 'antd'
import elevation from '../../assets/plots/RESULTS/PLOTS_BEFORE_ELIMINATING_OUTLIERS/elevation_box_plot.PNG'
import elevationWithLandslide from '../../assets/plots/RESULTS/PLOTS_BEFORE_ELIMINATING_OUTLIERS/ELEVATION600.PNG'
import energy from '../../assets/plots/RESULTS/PLOTS_BEFORE_ELIMINATING_OUTLIERS/BOX_PLOT_OF_ENERGY.PNG'
import energyWithLandslide from '../../assets/plots/RESULTS/PLOTS_BEFORE_ELIMINATING_OUTLIERS/EARTHQUAKE_MAGNITUDE.PNG'
import precipitation from '../../assets/plots/RESULTS/PLOTS_BEFORE_ELIMINATING_OUTLIERS/PRECIPITATIOM_BOX_PLOT.PNG'
import precipiWithLandslide from '../../assets/plots/RESULTS/PLOTS_BEFORE_ELIMINATING_OUTLIERS/PRECIPITATION_VERSUS_LANDSLIDE_OUTLIERS_YES.PNG'
import slope from '../../assets/plots/RESULTS/PLOTS_BEFORE_ELIMINATING_OUTLIERS/box_plot_of_slope.PNG'
import slopeWithLandslide from '../../assets/plots/RESULTS/PLOTS_BEFORE_ELIMINATING_OUTLIERS/slope.PNG'
const Plot2 = () => {
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

export default Plot2