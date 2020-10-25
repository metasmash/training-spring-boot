import React, { useEffect, useState } from 'react'
import * as css from './App.css'
import * as req from './requests'
import _ from 'lodash'
import { Button, Card, Spinner } from 'react-bootstrap'
import { TextField } from '@material-ui/core'
import Footer from './component/Footer'
import { Banner } from './component/Banner'

const App = () => {
    const [products, setProducts] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [selectedButton, setSelectedButton] = useState(0)
    const [searchNom, setSearchNom] = useState('')

    const [nameToPost, setNameToPost] = useState('')
    const [priceToPost, setPriceToPost] = useState(0)
    const [buyPriceToPost, setBuyPriceToPost] = useState(0)

    const handleKeyPress = (e) => {
        //See notes about 'which' and 'key'
        if (e.keyCode === 13) {
            setSelectedButton(3)
            setIsLoading(true)
            req.getProduitsByNom(searchNom).then((r) => {
                setProducts(r.data)
                setIsLoading(false)
            })
        }
    }

    return (
        <div className="App">
            <Banner />
            <h1 className={css.centered}>
                Running spring-boot Product api-rest.
            </h1>
            <div className={css.flexButtons}>
                <Button
                    variant={selectedButton === 1 ? 'primary' : 'secondary'}
                    style={{ margin: 20 }}
                    onClick={(e) => {
                        setSelectedButton(1)
                        setIsLoading(true)
                        req.getProduits().then((r) => {
                            setProducts(r.data)
                            setIsLoading(false)
                        })
                    }}
                >
                    Show list of product
                </Button>
                <Button
                    variant={selectedButton === 2 ? 'primary' : 'secondary'}
                    style={{ margin: 20 }}
                    onClick={(e) => {
                        setSelectedButton(2)
                        setIsLoading(true)
                        req.getProduitsTriNom().then((r) => {
                            setProducts(r.data)
                            setIsLoading(false)
                        })
                    }}
                >
                    Show list of product ordered by name
                </Button>
                <Button
                    variant={selectedButton === 3 ? 'primary' : 'secondary'}
                    style={{ margin: 20 }}
                    onClick={(e) => {
                        setSelectedButton(3)
                        setIsLoading(true)
                        req.getProduitsByNom(searchNom).then((r) => {
                            setProducts(r.data)
                            setIsLoading(false)
                        })
                    }}
                >
                    Show list with name
                </Button>

                <TextField
                    value={searchNom}
                    id="outlined-search"
                    label="Search field"
                    type="search"
                    variant="outlined"
                    onKeyPress={handleKeyPress}
                    onChange={(e) => {
                        setSearchNom(e.target.value)
                    }}
                />
            </div>

            <div className={css.flex}>
                <TextField
                    style={{ margin: 20 }}
                    value={nameToPost}
                    id="outlined-search"
                    label="Nom"
                    type="search"
                    variant="outlined"
                    onChange={(e) => {
                        setNameToPost(e.target.value)
                    }}
                />
                <TextField
                    style={{ margin: 20 }}
                    value={priceToPost}
                    id="outlined-search"
                    label="Prix"
                    type="number"
                    variant="outlined"
                    onChange={(e) => {
                        setPriceToPost(e.target.value)
                    }}
                />
                <TextField
                    style={{ margin: 20 }}
                    value={buyPriceToPost}
                    id="outlined-search"
                    label="Prix achat"
                    type="number"
                    variant="outlined"
                    onChange={(e) => {
                        setBuyPriceToPost(e.target.value)
                    }}
                />

                <Button
                    onClick={() => {
                        req.ajouterArticle(
                            nameToPost,
                            priceToPost,
                            buyPriceToPost
                        ).then(() => {
                            alert(`Article ${nameToPost} added ;)))`)
                        })
                    }}
                >
                    POST ARTICLE
                </Button>
            </div>
            {isLoading ? (
                <Spinner
                    animation="border"
                    role="status"
                    variant="primary"
                    className={css.centeredBis}
                >
                    <span className="sr-only">Loading...</span>
                </Spinner>
            ) : (
                <div className={css.flex}>
                    {products ? (
                        products.map((e) => {
                            return (
                                <Card
                                    style={{ width: '18rem', margin: 10 }}
                                    key={e.id}
                                >
                                    <Card.Img variant="top" src="product.jpg" />
                                    <Card.Body>
                                        <Card.Title>{e.nom}</Card.Title>
                                        <Card.Text>
                                            Product description
                                        </Card.Text>
                                        <Button variant="primary">
                                            {`Add to shoplist for ${e.prix} euros`}
                                        </Button>
                                        <Button
                                            variant="danger"
                                            style={{ marginTop: 20 }}
                                            onClick={() => {
                                                req.deleteArticle(e.id)
                                                setProducts(
                                                    _.filter(
                                                        products,
                                                        (o) => o.id !== e.id
                                                    )
                                                )
                                            }}
                                        >
                                            DELETE PRODUCT
                                        </Button>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    ) : (
                        <div></div>
                    )}
                </div>
            )}
            <Footer />
        </div>
    )
}

export default App
