import { Space } from 'antd'
import corel_heatmap from '../../assets/plots/RESULTS/CORRELATION_HEATMAPS/correlation_heatmap2.PNG'
// import corel_heatmap from '../../assets/plots/RESULTS/CORRELATION_HEATMAPS/correlation_heatmap.PNG'

const Plot1 = () => {
    return(
        <Space direction='horizontal'>
            <img src={corel_heatmap}/>
        </Space>
    )

}

export default Plot1