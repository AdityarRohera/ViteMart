import pool from "../../Config/dbConnect.js"
import { oneDayEarningQuery, totalEarningQuery, totalIncomingOrdersQuery } from "../../Queries/order.schema.js";
import { getTotalProductCount } from "../../Queries/product.schema.js";


export const vendorDashboardInfo = async (vendor_id: any) => {
  const client = await pool.connect();
  try {

    const totalProducts = await client.query(getTotalProductCount, [vendor_id]);
    const todayEarning = await client.query(oneDayEarningQuery, [vendor_id]);
    const totalIncomingOrders = await client.query(totalIncomingOrdersQuery, [vendor_id]);
    const totalEarning = await client.query(totalEarningQuery, [vendor_id]);

    return {
      totalProducts: totalProducts.rows[0].totalcount,
      todayEarning: todayEarning.rows[0].todays_earning,
      totalIncomingOrders: totalIncomingOrders.rows[0].incomingorders,
      totalEarning: totalEarning.rows[0].total_earning
    };

  } finally {
    client.release();
  }
};