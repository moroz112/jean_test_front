import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import moment from 'moment';
import CustomerAutocomplete from 'app/components/CustomerAutocomplete'
import ProductAutocomplete from 'app/components/ProductAutocomplete'
import { Customer, Product } from 'types'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { useApi, useQuery } from 'api';
import { Invoice } from 'types';

const EditInvoice = () => {
    const query = useQuery();
    const isFinalized = query.get('isFinalized');
    const [customer, setCustomer] = useState<Customer>()
    const [product, setProduct] = useState<Product>();
    const {id} = useParams<{id: string}>();
    const api = useApi();
    const history = useHistory();
    const [isPaid, setIsPaid] = useState<'Yes' | 'No'>('No');
    const [deadlineDate, setDeadlineDate] = useState<string>('');
    const [quantity, setQuantity] = useState<string>();

    useEffect(() => {
        if (isFinalized === 'yes') {
            setIsPaid('Yes');
        } else {
            setIsPaid('No');
        }
    }, [isFinalized])
    // {
    //     "invoice": {
    //     "id": 6757,
    //         "customer_id": 6773,
    //         "finalized": false,
    //         "paid": true,
    //         "date": "2021-02-03",
    //         "deadline": "2021-03-05",
    //         "invoice_lines_attributes": [
    //         {
    //             "id": 45,
    //             "_destroy": false,
    //             "product_id": 67,
    //             "quantity": 1,
    //             "label": "Tesla Model S with Pennylane logo",
    //             "unit": "hour",
    //             "vat_rate": "0",
    //             "price": "120.00",
    //             "tax": "20.00"
    //         }
    //     ]
    // }
    // }
    const handleEditInvoice = (params: any) => () => {
      console.log('customer', customer);
      console.log('product', product);
        api.postInvoices({}, params).then(({ data }) => {
            history.replace('/');
        })
    };

    if (isFinalized === 'yes') {
        return (
            <div>
                <Form.Group controlId="formBasicSelect">
                    <Form.Label>Select Norm Type</Form.Label>
                    <Form.Control
                        as="select"
                        value={isPaid}
                        onChange={e => {
                            setDeadlineDate(e.target.value);
                        }}
                    >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </Form.Control>
                </Form.Group>
                <Button onClick={handleEditInvoice({
                    invoice: {
                        paid: isPaid === 'Yes' ? true : false
                    }
                })} variant="outline-primary">Edit current</Button>
            </div>
        )
    }

    return (
        <>
            <div className="mb-3">
                <CustomerAutocomplete value={customer} onChange={setCustomer} />
            </div>
            <div className="mb-5">
                <ProductAutocomplete value={product} onChange={setProduct} />
            </div>
            <Form.Group>
                <Form.Label>Select Norm Type</Form.Label>
                <Form.Control
                    as="select"
                    value={isPaid}
                    onChange={e => {
                        setIsPaid(e.target.value as 'Yes' | 'No');
                    }}
                >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Select deadline date</Form.Label>
                <Form.Control
                    type="date"
                    onChange={e => {
                        setDeadlineDate(e.target.value);
                    }}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Set Quantity</Form.Label>
                <Form.Control
                    as="input"
                    type="number"
                    onChange={e => {
                        setQuantity(e.target.value);
                    }}
                />
            </Form.Group>
            <Button  onClick={handleEditInvoice({
                invoice: {
                    // id: Number(id),
                    customer_id: customer?.id,
                    paid: isPaid,
                    finalized: false,
                    date: moment(new Date()).format('MM/DD/YYYY'),
                    deadline: deadlineDate,
                    invoice_lines_attributes: [{
                        // id: product?.id,
                        // _destroy: product?._destroy,
                        product_id: product?.id,
                        quantity: quantity,
                        label: product?.label,
                        unit: product?.unit,
                        vat_rate: product?.vat_rate,
                        price: product?.unit_price,
                        tax: product?.unit_tax,
                    }]
                }
            })} variant="outline-primary">Edit current invoice</Button>
        </>
    )
};

// invoice": {
// "id": 6757,
//     "customer_id": 6773,
//     "finalized": false,
//     "paid": true,
//     "date": "2021-02-03",
//     "deadline": "2021-03-05",
//     "invoice_lines_attributes": [
//     {
//         "id": 45,
//         "_destroy": false,
//         "product_id": 67,
//         "quantity": 1,
//         "label": "Tesla Model S with Pennylane logo",
//         "unit": "hour",
//         "vat_rate": "0",
//         "price": "120.00",
//         "tax": "20.00"
//     }
// ]
export default EditInvoice;