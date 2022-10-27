from pywebio.platform.flask import webio_view
from pywebio import STATIC_PATH
from flask import Flask, send_from_directory
from pywebio.input import *
from pywebio.output import *
import cv2
import urllib.request
import numpy as np
import wget


import pickle
import numpy as np
from keras.models import load_model
import datetime


diff = 0.1103
layers = {
    'fapar' : ['Coastlines_15m,MODIS_Combined_L4_FPAR_4Day,MODIS_Terra_L4_FPAR_8Day,MODIS_Aqua_L4_FPAR_8Day,MODIS_Combined_L4_FPAR_8Day','x,none,none,none,none'],
    'edvi' : ['Coastlines_15m,MODIS_Aqua_L3_EVI_16Day','x,none'],
    'ndvi' : ['Coastlines_15m,MODIS_Terra_L3_NDVI_16Day','x,none'],
    'lst_m_day' : ['Coastlines_15m,MODIS_Terra_L3_Land_Surface_Temp_Monthly_Day', 'x,none'],
    'lst_m_nt' : ['Coastlines_15m,MODIS_Terra_L3_Land_Surface_Temp_Monthly_Night', 'x,none'],
    'precip' : ['Coastlines_15m,IMERG_Precipitation_Rate', 'x,none'],
    'elev' : ['Coastlines_15m,ASTER_GDEM_Color_Index', 'x,none']
}

cities = {
    'CAVITE': '14.3294,120.9367',
    'LAGUNA': '14.2167,121.1667',
    'CEBU': '10.3,123.9',
    'ILOILO': '10.7167,122.5667',
    'QUEZON_CITY': '14.6333,121.0333',
    'PANGASINAN': '15.9281,120.3489',
    'BULACAN': '14.7928,120.8789',
    'NEGROS_OCCIDENTAL': '9.9833,122.8167',
    'BATANGAS': '13.75,121.05',
    'RIZAL': '14.5842,121.1763',
    'PAMPANGA': '15.0333,120.6833',
    'BUKIDNON': '7.9,125.0833',
    'NUEVA_ECIJA': '15.4833,120.9667',
    'TARLAC': '15.4802,120.5979',
    'NEGROS ORIENTAL': '9.3103,123.3081',
    'BOHOL': '9.65,123.85',
    'SOUTH_COTABATO': '6.5,124.85',
    'QUEZON': '7.7333,125.1',
    'ZAMBOANGA_CITY': '6.9167,122.0833',
}

def latlong_gen(city):
    latlong = cities[city]
    lat_v, long_v = latlong.split(",")
    
    #define size of BBOX?
    LL_lat = round(float(lat_v) - diff,4)
    LL_long = round(float(long_v) - diff,4)
    UR_lat = round(float(lat_v) + diff, 4)
    UR_long = round(float(long_v) + diff, 4)

    bbox = str(LL_lat) + "," + str(LL_long) + "," + str(UR_lat) + "," + str(UR_long) 
    return bbox

def url_gen(full_date_txt, bbox, layer, width, height):
    x_layer = layers[layer][0]
    x_wrap = layers[layer][1]
    url = "https://wvs.earthdata.nasa.gov/api/v1/snapshot?REQUEST=GetSnapshot&TIME=" + \
    full_date_txt + "T00:00:00Z&" + \
    "BBOX=" + bbox + "&CRS=EPSG:4326&" + \
    "LAYERS=" + x_layer + "&WRAP=" + x_wrap + "&FORMAT=image/jpeg&" + \
    "WIDTH=" + str(width) + "&HEIGHT=" + str(height) + "&ts=1663663285756"
    return url

model = load_model('models/cvision_model_cavite_fapar_daily.h5')

app = Flask(__name__)



def predict():

    data = input_group("Fill out the details: ", [
    # input('Choose Year', name="Year", type=SELECT, required=True, Placeholder="2022", options=[2022, 2021, 2020]),
    # input('Choose Month', name="Month", type=SELECT, required=True, Placeholder="1", options=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]),
    # input('Choose Day', name="Day", type=SELECT, required=True, Placeholder="1", options=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]),
    # input('Choose Layer', name="Layer", type=SELECT, required=True, Placeholder="fapar", options=['fapar', 'edvi' ]),
    # input('Choose Location', name="Location", type=SELECT, required=True, Placeholder="CAVITE", options=['CAVITE', 'QUEZON CITY' ])
    select("Choose Year: ", name="Year", options=[2022, 2021, 2020]),
    select("Choose Month: ", name="Month", options=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]),
    select("Choose Day: ", name="Day", options=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]),
    select("Choose Layer: ", name="Layer", options=['fapar', 'edvi']),
    select("Choose Location: ", name="Location", options=['CAVITE', 'QUEZON CITY'])
],  cancelable=True)
    
    print(data)
    bbox = latlong_gen(data['Location']) 
    full_date = datetime.datetime(data['Year'], data['Month'], data['Day'])
    full_date_txt = full_date.strftime("%Y-%m-%d")
    url = url_gen(full_date_txt, bbox, data['Layer'], 800, 800)

    url_response = urllib.request.urlopen(url)
    img = cv2.imdecode(np.array(bytearray(url_response.read()), dtype=np.uint8), -1)
    img = cv2.resize(img,(224,224))
    img = img.reshape(1,224,224,3)


    prediction = model.predict(img)
    prediction=np.transpose(prediction)[0]
    prediction = list(map(lambda x: 0 if x<0.5 else 1, prediction))
    
    if prediction[0] == 1:
        put_image(url)
        popup(full_date_txt, "Yes, There's an outbreak in " + data['Location'])
    else:
        put_image(url)
        popup(full_date_txt, "No, There's no outbreak in "+ data['Location'])

app.add_url_rule('/tool', 'webio_view', webio_view(predict), methods=['GET', 'POST', 'OPTIONS'])

app.run(host='localhost', port=80)
