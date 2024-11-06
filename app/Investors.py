from sqlalchemy import create_engine, text
from pgsecrets import pgs

class Investors:

    def __init__(self):
        # establish connections
        self.engine = create_engine("postgresql://{user}:{pw}@localhost:5432/preqin".format(**pgs)) 
    
    def get_investors(self):
        """
            Get all investor records from investors table.
            Parameters
            ----------
            none

            Returns
            -------
            investors: dict
        """
        # write the SQL query inside the text() block 
        sql = text('SELECT min(investor_id) as id, investor_name, investor_type, investor_date_added, investor_country, SUM(commitment_amount) as total_commitment FROM investors GROUP BY investor_name, investor_type, investor_date_added, investor_country') 
        #sql = text('SELECT * FROM investors')
        with self.engine.connect() as conn:
            results = conn.execute(sql)    
        
        # return the records
        investors_all = []
        for record in results:
            investors_all.append(record._asdict())

        return(investors_all) 


    def get_investor(self, investor_name):
        """
            Get investor record by investor_id from investors table.
            Parameters
            ----------
            investor_id: it

            Returns
            -------
            investor: dict
        """
        # write the SQL query inside the text() block 
        sql = text("SELECT investor_id, investor_name, commitment_asset_class, commitment_currency, commitment_amount from investors WHERE investor_name = '{}'".format(investor_name)) 
        with self.engine.connect() as conn:
            results = conn.execute(sql)    
        
        # return the record
        investor = []
        for record in results:
            investor.append(record._asdict())

        return(investor)            