import unittest
import sys

from Investors import Investors
db = Investors()

class TestInvestors(unittest.TestCase):
    def setup_class(self):
        self.valid_investor = db(
            investor_id=5,
            investor_name="Ioo Gryffindor fund",
            investor_type="fund manager",
            investor_country="Singapore",
            investor_date_added="2000-07-06",
            investor_last_update="2024-10-02T08:10:00",
            commitment_asset_class="Infrastructure",
            commitment_amount=15000000,
            commitment_currency="GBP"
        )

    def teardown_class(self):
        self.session.rollback()
        self.session.close()


if __name__ == "__main__":
    unittest.main()
