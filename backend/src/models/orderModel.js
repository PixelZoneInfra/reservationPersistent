import { pool } from '../db.js';

export async function createOrder(data) {
  const { customerName, deskNumber, items, total } = data;
  const res = await pool.query(
    `INSERT INTO orders(customer_name, desk_number, items, total)
     VALUES($1,$2,$3,$4) RETURNING *`,
    [customerName, deskNumber, JSON.stringify(items), total]
  );
  return res.rows[0];
}

export async function getOrders() {
  const res = await pool.query(`SELECT * FROM orders ORDER BY completed, created_at`);
  return res.rows;
}

export async function toggleOrder(id) {
  const res = await pool.query(
    `UPDATE orders SET completed = NOT completed,
      completed_at = CASE WHEN NOT completed THEN NOW() ELSE NULL END
     WHERE id=$1 RETURNING *`,
    [id]
  );
  return res.rows[0];
}
