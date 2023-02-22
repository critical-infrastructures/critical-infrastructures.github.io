#%%
import pandas as pd
import json
from us_state_names import us_state_to_abbrev
states = pd.DataFrame([
    (st['properties']['name'],st['id'])
    for st in json.load(open('../src/data/us-states.json'))['features']
],columns=['fullname','stateId'])
states['state'] = states.fullname.map(us_state_to_abbrev)
df = pd.read_csv('predictions.csv')
# df2 = pd.read_csv('predictions2.csv')

#%%
import numpy as np

# cities = pd.read_csv('uscities.csv')
df = df.loc[:, ~df.columns.str.contains('^Unnamed')]
df = pd.merge(df,states,on=['state'],how='left')
properties = [c for c in df.columns if not c in ['latitude','longitude']]

#%%
# properties = ['latitude','longitude','powerplantName','landslideProb','soilMoisture','earthquakeMag','elevation','slope','stateId','stateName']
import json
geojson =[
        {
            'type':'Feature',
            'id':str(i),
            'properties':{p:row[p] for p in properties},
            'geometry': {
                'type': 'Point',
                'coordinates':[row.longitude,row.latitude],
            }
        }
        for i,row in df.iterrows()
    ]
# geojson = df_to_geojson(fake_data,['landslide_prob'])
json.dump(geojson, open('../src/data/real_geo.json','w'))
    
# %%
