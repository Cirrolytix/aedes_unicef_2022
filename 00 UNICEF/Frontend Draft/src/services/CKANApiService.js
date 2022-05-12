import axios from "axios";

const API_TOKEN = process.env.REACT_APP_CKAN_API_TOKEN;

export const fetchRemoteSensingGeoJson = async () => {
    try {
        const res = await axios.get(
            "https://aedes-datacatalogue-beta.xyz/api/3/action/datastore_search?resource_id=1fecac99-493f-44a3-91c3-b2da4beb914e",
            {
                headers: {
                    Authorization: API_TOKEN,
                },
            }
        );
        return res.data;
    } catch (error) {
        return error;
    }
};
