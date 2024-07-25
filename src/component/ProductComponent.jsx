import React, { useContext, useState } from 'react';
import CartComponent from './CartComponent';
import { ProductDataContext } from '../context/ProductContext';

function ProductComponent() {
    const data = useContext(ProductDataContext);
    
    const initialQuantities = data[0].products.map(() => 1);
    const [quantities, setQuantities] = useState(initialQuantities);

    const handleQuantityChange = (index, value) => {
        const newQuantities = [...quantities];
        newQuantities[index] = value;
        setQuantities(newQuantities);
    };

    const calculateSubtotal = (price, quantity) => {
        return price * quantity;
    };

    const totalPrice = data[0].products.reduce((total, product, index) => {
        return total + calculateSubtotal(product.price, quantities[index]);
    }, 0);

    const tax = totalPrice * 0.05; // Assuming 5% tax
    const discount = 60.00; // Example discount
    const finalTotal = totalPrice - discount + tax;

    return (
        <>
            <section className="bg-light my-5">
                <div className="container justify-content-center">
                    <div className="row ">
                        {/* <!-- cart --> */}
                        <div className="col-lg-9">
                            <div className="card border shadow-0">
                                <div className="m-4">
                                    <h4 className="card-title mb-4">Your shopping cart</h4>
                                    {
                                        data[0].products.map((product, index) => (
                                            <div className="row gy-3 mb-4" key={index}>
                                                <div className="col-lg-5">
                                                    <div className="me-lg-5">
                                                        <div className="d-flex">
                                                            <img src={product.image} className="border rounded me-3" style={{ width: '96px', height: '96px' }} alt={product.title} />
                                                            <div>
                                                                <a href="#" className="nav-link">{product.title}</a>
                                                                <p className="text-muted">{product.description}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                                                    <div>
                                                        <select
                                                            style={{ width: '100px' }}
                                                            className="form-select me-4"
                                                            value={quantities[index]}
                                                            onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                                                        >
                                                            <option value={1}>1</option>
                                                            <option value={2}>2</option>
                                                            <option value={3}>3</option>
                                                            <option value={4}>4</option>
                                                            <option value={5}>5</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <span className="h6">${calculateSubtotal(product.price, quantities[index]).toFixed(2)}</span> <br />
                                                        <small className="text-muted text-nowrap">${product.price} / per item</small>
                                                    </div>
                                                </div>                                                                     
                                            </div>
                                        ))
                                    }
                                </div>

                                <div className="border-top pt-4 mx-4 mb-4">
                                    <p><i className="fas fa-truck text-muted fa-lg"></i> Free Delivery within 1-2 weeks</p>
                                    <p className="text-muted">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                                    </p>
                                </div>
                            </div>
                        </div>
                        <CartComponent totalPrice={finalTotal} tax={tax} discount={discount} />
                    </div>
                </div>
            </section>
        </>
    );
}

export default ProductComponent;
