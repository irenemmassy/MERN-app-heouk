import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/oderModel.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.post(
  "/",
  // isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "Cart is Empty" });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        itemsPrice: req.body.itemsPrice,
        shippigPrice: req.body.shippigPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        // user: req.user._id,
      });
      const createOrder = await order.save();
      res
        .status(201)
        .send({ message: "New Order Created", order: createOrder });
    }
  })
);

orderRouter.get(
  "/:id",
  // isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

orderRouter.put(
  "/:id/pay",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updateOrder = await order.save();
      res.send({ message: "Order Paid", order: updateOrder });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

export default orderRouter;
