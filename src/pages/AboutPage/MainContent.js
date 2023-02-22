const MainContent = () => {
    return(
        <div
            style={{textAlign:'left'}}
        >
            <b>Goal of the project:</b>
            <br/>
            To design an early warning system to inform the critical infrastructures facilities about the landslide risk posed by factors such as rainfall and earthquake.
            <br/>
            <br/>
            <b>Dataset description:</b>
            <br/>
            The dataset used to train the model is composed of the following datasets:
            <br/><br/>
            1. Critical infrastructure data obtained from Homeland Infrastructure Foundation-Level Data (HIFLD)
            <br/>
            2. Rainfall data obtained from Goddard Earth Sciences Data and Information Services Center (GES DISC)
            <br/>
            3.  Earthquake data obtained from The USGS Earthquake Hazards Program
            <br/>
            4.  Soil moisture data obtained from NASA USDA global soil moisture data
            <br/>
            5.  Topography data obtained from Google Earth
            <br/><br/>
            <b>Techniques used to eliminate outliers:</b>
            <br/>
            1. Winsorization
            <br/>
            2. The boxplot approach 
            <br/>
            3. Log transformation
            <br/><br/>
            <b>Model used train and predict:</b>
            <br/>
            Random Forest Regressor
        </div>
    )

}

export default MainContent