import express from "express";
import isAuth from "../middleware/isAuth";

import * as SubQueues from "../controllers/SubQueuesController"

const subQueuesRoutes = express.Router();;



subQueuesRoutes.post("/subQueues/:queueId", SubQueues.store);

subQueuesRoutes.get("/subQueues/:queueId",  SubQueues.index);



export default subQueuesRoutes;
