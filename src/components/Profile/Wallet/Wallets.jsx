import { React, useState,useEffect } from "react";
import { Col, Row, Button, Card, Badge } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { walletDetailsApi,addMoneyWalletApi,filterWalletApi } from "../../../services/ProfilePageServices";
import { FaPencilAlt } from "react-icons/fa";
import FilterWalletPopup from"../Popup/Wallet/FilterWalletPopup"
import { AiFillFilter } from "react-icons/ai";
import { MyWallet } from "../../../constants/ProfilePageResponse";
import AddMoneyPopup from "../Popup/Wallet/AddMoneyPopup";
import "./Wallets.css";
function Wallets() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const closePopUp = (value) => {
    setShow(value);
  };

  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const showshowFilter = () => {
    setShowFilterPopup(true);
    }
  

  const LocationPopUp = (value) => {
    setShowFilterPopup(value);
  };


  // console.log(MyWallet.total_balance);
  const [walletData, setWalletData] = useState([]);

  useEffect(() => {
    const walletDetailsApiValuesApi = async () => {
      let postWalletDetailsApiObject = {
        page: "0",
        limit: "5",
      };

      try {
        let walletDetailsApiResponse = await walletDetailsApi(
          postWalletDetailsApiObject
        );
        setWalletData(walletDetailsApiResponse.data.data);
        // window.location.reload(true); //refresh the page
      } catch (e) {}
    };
    walletDetailsApiValuesApi();
  }, []);


  const filterWalletValuesApi = async () => {
    let postFilterWalletApiObject = {
      page: "0",
      limit: "5",
    };

    try {
      let filterWalletApiResponse = await filterWalletApi(
        postFilterWalletApiObject
      );
    } catch (e) {}
  };

  const addMoneyWalletApiValuesApi = async () => {
    let postAddMoneyWalletApiObject = {
      amount: "100",
      payment_method: "1",
      order_id:""
    };

    try {
      let addMoneyWalletResponse = await addMoneyWalletApi(
        postAddMoneyWalletApiObject
      );
      // window.location.reload(true); //refresh the page
    } catch (e) {}
  };

  let WalletDetails= walletData?.all_transactions
// console.log(WalletDetails)
        // console.log(walletData);

  return (
    <>
      <Col lg="1" />
      <Col lg="8" className="ms-3">
        <Card className="Wallet_Card">
          <Row>
            <Col lg="1" />
            <Col lg="9" className="mt-5">
              <Card.Title>Wallet Detail</Card.Title>
              <Row className="mt-5">
                <Col lg="5">
                  <Card className="TotalBlance" style={{ borderRadius: "1px" }}>
                    <p
                      style={{ fontWeight: "500", fontSize: "120%" }}
                      className="TotalBalanceProfile mt-4"
                    >
                      Total Balance
                    </p>

                    <p
                      style={{ fontWeight: "500", fontSize: "120%" }}
                      className="TotalAmountProfile mx-5 mb-4"
                    >
                      {walletData?.total_balance}
                    </p>
                  </Card>
                </Col>
<Col lg="2"/>
                <Col lg="5" className=" mb-3">
                  <Card
                    className="TotalMoneyAddedCard"
                    style={{ borderRadius: "1px" }}
                  >
                    <Row>
                      <Col lg="1" />
                      <Col lg="11" className="ms-3">
                        <p className="TotalMoneyAddedinProfile mx-4 mt-2">
                          Total Money Added <br />
                          <small className="mx-5">
                            ${walletData?.total_money_added}
                          </small>
                        </p>
                      </Col>
                    </Row>
                  </Card>
                  <Row>
                    <Col lg="12">
                      <Card
                        style={{ borderRadius: "1px" }}
                        className="CashBackCard mt-2 mb-2"
                      >
                        <Row>
                          <Col lg="1" />
                          <Col lg="10" className="mt-2 CashBackinProfile">
                            <p>
                              Total Cashback <br />
                              <small>${walletData?.total_cashback}</small>
                            </p>
                          </Col>
                          <Col lg="1" />
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Row>
              <Col lg="1" />
              <Col lg="8">
                <Badge className="transactionBadge">
                  <p className="transactionFont ms-3 mt-1">Transactions</p>
                  <Row>
                    <Col lg="10" />
                    <Col lg="2" className="mt-1">
                      <AiFillFilter className="filterIcon"
                      onClick={showshowFilter}
                      />
                    </Col>
                  </Row>
                </Badge>
              </Col>
            </Row>
            <Row className="WalletDeatilsProfile">
              {WalletDetails?.map((item, index) => (
                <>
                  <Col lg="2" />

                  <Col lg="4" className="mt-1">
                    <small>{item.display_name}</small>{" "}
                    <small className="ms-2">(cashback)</small>
                    <br />
                    <small className="">{item.wallet_date}</small>
                  </Col>
                  <Col lg="4">
                    <small
                      style={{
                        fontSize: "140%",
                        fontWeight: "700",
                        color: "green",
                      }}
                      className="AmountCreditedProfilepage"
                    >
                      +${item.credited}
                    </small>
                    
                  </Col>

                  {/* <Col lg="3" className=" ms-2 mt-2 mb-1">
                   
                  </Col>

                  <Col lg="3" />

                  <Col lg="3">
                   
                  </Col> */}
                  <Col lg="2" />
                  <Row>
              <Col lg="2" />
              <Col lg="7" className="ms-4">
                <hr />
              </Col>
            </Row>

                </>
              ))}
            </Row>
           
            <Row>
              <Col lg="5" />
              <Col lg="3">
                <Button className="mt-2 mb-3 ms-3" onClick={handleShow}>
                  Add Money
                </Button>
              </Col>
            </Row>
          </Row>
        </Card>
      </Col>
      <AddMoneyPopup show={show} closePopUp={closePopUp} />
      <FilterWalletPopup
        showFilterPopup={showFilterPopup}
        LocationPopUp={LocationPopUp}
      />
    </>
  );
}

export default Wallets;
