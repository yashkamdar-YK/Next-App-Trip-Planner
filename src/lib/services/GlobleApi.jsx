import axios from "axios"

const BASE_URL='https://places.googleapis/v1/places:searchText'

const config={
    headers:{
        'Content-Type': 'application/json',
        'X-Goog-FieldMask': process.env.VITE_API_KEY,
        'X-Goog-FieldMask':[
            'places.photos',
            'places.displayName',
            'places.id'
        ]
    }
}

export const GetPlaceDetail = (data)=>axios.post(BASE_URL,data,config)