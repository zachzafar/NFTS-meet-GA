# NFTGenerator

working with virtual environment under the project folder:

### `python -m venv venv_name`
### `source venv_name/bin/activate`
### `python -r pip install requirement.txt`

Before artwork generation
put all your layer into ./artwork/

### `touch .env`

edit .env file with the following detail
```
CREATER_WALLET_PUBLIC_KEY = 
CREATER_SHARE = 
BASE_NAME = 
DESC = 
SYMBOL = 
SELLER_FEE = 
NO_OF_ARTWORK = 
```

Generate arkwork and meta data

run: 
### `python generate_nft.py`

after execute generate_nft.py. folder config and output will be create. metadata.json and all artwork will be generated and store under output folder. a CSV file will store under ./config/

run the unit testing:
run:
### `pytest -v`

