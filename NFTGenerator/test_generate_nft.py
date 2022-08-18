import generate_nft

def test_generate_creator_address_list():
    creator_and_share = generate_nft.generate_creator_address_list()
    assert len(creator_and_share) == 3
    
def test_generate_nft():
    metadata_json = generate_nft.generate_nft()
    assert len(metadata_json) == generate_nft.NO_OF_ARTWORK