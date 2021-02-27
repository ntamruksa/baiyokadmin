import React, { useState } from 'react'
import { Badge, Button, Card, Row, Col } from 'react-bootstrap'
import {
  useQueryClient,
  useMutation
} from 'react-query'

import OrderModal from '../modal/OrderModal'
import api from '../../services/API'

const OrderCard = ({ order = null, showStatus = false }) => {
  const queryClient = useQueryClient()
  const [showOrder, setShowOrder] = useState(false)
  const hideOrder = () => {
    setShowOrder(false)
  }

  const {mutate: showOrderModal} =  useMutation(() => api.touchOrder(order._id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['ordersQuery', 'open'])
      queryClient.invalidateQueries('getUntouchedCount')
      setShowOrder(true)
    }
  })

  return (
    <>
      {showOrder && (
        <OrderModal
          show={showOrder}
          onHide={hideOrder}
          order={order}
        />
      )}

      <Card
        style={{ width: '70rem', backgroundColor: order.option === 'delivery' ? '#EBDEF0' : '#D5F5E3'}}
        className='p-4 m-4'
        onClick={() => showOrderModal()}>
        <Card.Body>
          <Row>
            <Col>
              <h2 className='py-2'>{order && order.pickupName}</h2>
              <h3>#{order.orderNumber}</h3>
            </Col>
            <Col className='text-right '>
              {!order.touched && <div className='touch-dot'></div>}
              {showStatus ? <h3>{order.status}</h3> : order.option === 'delivery' ? <h3>Delivery</h3>: <h3>Pickup Time: {order.pickupTime} {order.delayMins ? `(+${order.delayMins} mins)` : ''}</h3>}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  )
}

export default OrderCard
