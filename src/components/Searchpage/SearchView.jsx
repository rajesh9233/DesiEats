import React from 'react'
import { Container, Col, Row,  Card } from "react-bootstrap";
import './SearchView.css'
function SearchView() {
  return (
    <>
    <Container>
        <Row>
            <Col lg="1"/>
            <Col lg="9"  className='mt-5 searchCard'>
                <Card className='searchCard'>
                    <Row className='searchCard'>
                        <Col lg="4"/>
                        <Col lg="8">
                        <Card.Title className='mt-3 searchCard'>Search Results</Card.Title>

                        </Col>

                    </Row>
                </Card>
            </Col>
        </Row>
    </Container>
    </>
  )
}

export default SearchView