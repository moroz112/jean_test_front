import { useApi } from 'api'
import { Invoice } from 'types'
import { useEffect, useCallback, useState } from 'react'
import {Link} from 'react-router-dom';

const InvoicesList = (): React.ReactElement => {
  const api = useApi()

  const [invoicesList, setInvoicesList] = useState<Invoice[]>([])

  const fetchInvoices = useCallback(async () => {
    const { data } = await api.getInvoices()
    setInvoicesList(data.invoices)
  }, [api]);

  const deleteInvoice = (id: number) => () => {
    api.deleteInvoice(id).then(({ data }) => {
      fetchInvoices();
    })
  };

  useEffect(() => {
    fetchInvoices()
  }, [fetchInvoices])

  return (
    <table className="table table-bordered table-striped invoice-list">
      <thead>
        <tr>
          <th>Id</th>
          <th>Customer</th>
          <th>Address</th>
          <th>Total</th>
          <th>Tax</th>
          <th>Finalized</th>
          <th>Paid</th>
          <th>Date</th>
          <th>Deadline</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {invoicesList.map((invoice) => (
          <tr key={invoice.id}>
            <td>
              <Link to={`/invoice/${invoice.id}`}>
                {invoice.id}
              </Link>
            </td>
            <td>
              {invoice.customer?.first_name} {invoice.customer?.last_name}
            </td>
            <td>
              {invoice.customer?.address}, {invoice.customer?.zip_code}{' '}
              {invoice.customer?.city}
            </td>
            <td>{invoice.total}</td>
            <td>{invoice.tax}</td>
            <td>{invoice.finalized ? 'Yes' : 'No'}</td>
            <td>{invoice.paid ? 'Yes' : 'No'}</td>
            <td>{invoice.date}</td>
            <td>{invoice.deadline}</td>
            <td>
              <div className="invoice-list__actions">
                <Link to={`/invoice-edit/${invoice.id}?isFinalized=${invoice.finalized ? 'yes' : 'no'}`}>
                  <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                  </svg>
                </Link>
                {invoice.finalized ? null : <svg onClick={deleteInvoice(invoice.id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash2-fill" viewBox="0 0 16 16">
                  <path d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z"/>
                </svg>}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default InvoicesList
