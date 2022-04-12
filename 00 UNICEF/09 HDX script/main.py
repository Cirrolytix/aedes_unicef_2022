from hdx.utilities.easy_logging import setup_logging
from hdx.api.configuration import Configuration
from hdx.data.dataset import Dataset
from hdx.data.resource import Resource

# setup_logging(console_log_level="DEBUG", log_file="output.log", file_log_level="INFO")
setup_logging()
# No HDX configuration parameter and no configuration file at default path: C:\Users\markn\.hdx_configuration.yml
# configuration defaults

Configuration.create(hdx_site="prod", user_agent="my_example", hdx_config_yaml="./.hdx_configuration.yml")

dataset = Dataset.read_from_hdx("inform-risk-quezon-city-data")
print(dataset.get("id"))
package_id = dataset.get("id")

resource_metadata = {
    "name": "data_from_hdx_api",
    "description": "Data uploaded from HDX API python",
    "package_id": package_id
}
resource = Resource(resource_metadata)
resource.set_file_to_upload("./haz_loc_vul_data_qc_MARCH_21_2022.csv", guess_format_from_suffix=True)
resource.create_in_hdx()
