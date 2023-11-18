import express from "express";
import isAuth from "../middleware/isAuth";

import * as SubQueues from "../controllers/SubQueuesController"

const subQueuesRoutes = express.Router();;



subQueuesRoutes.post("/subqueues/:queueId", SubQueues.store);

subQueuesRoutes.get("/subqueues/:queueId",  SubQueues.index);



export default subQueuesRoutes;
