import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useQuery } from 'react-query'
import OrderCard from '../components/order/OrderCard'
import { isLoggedIn } from '../services/auth'
import api from '../services/API'

const OrderPreparing = ({}) => {
  const [showModal, setShowModal] = useState(false)
  // const [orders, setOrders] = useState([])
  const [refresh, setRefresh] = useState(false)

  const closeModal = () => {
    setShowModal(false)
  }

  const cancel = () => {
    closeModal()
    navigate('/')
  }

  const refreshOrders = () => {
    setRefresh(!refresh)
  }

  const { data: orders, isLoading } = api.ordersQuery('preparing')

  return (
    <>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <section className='section section-main'>
          {isLoggedIn() ? (
            <Container>
              <div className='mb-4'>Preparing</div>
              {/* <div className='bg-white rounded border shadow-sm mb-4'> */}
              {orders ? (
                orders.map((order) => (
                  <OrderCard
                    key={order._id}
                    order={order}
                  />
                ))
              ) : (
                <h1>No order cooking in kitchen.</h1>
              )}
              {/* </div> */}
            </Container>
          ) : (
            <>
              <Container>
                <div className='mb-4'>Please login</div>
              </Container>
            </>
          )}
        </section>
      )}
    </>
  )
}

export default OrderPreparing
