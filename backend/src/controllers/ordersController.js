import { createOrder, getOrders, toggleOrder } from '../models/orderModel.js';

export async function postOrder(req, res) {
  const order = await createOrder(req.body);
  res.status(201).json(order);
}

export async function fetchOrders(req, res) {
  const orders = await getOrders();
  res.json(orders);
}

export async function updateOrder(req, res) {
  const order = await toggleOrder(req.params.id);
  res.json(order);
}
