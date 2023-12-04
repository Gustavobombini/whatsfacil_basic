import { Request, Response } from "express";
import SubQueues from "../models/SubQueues";



export const index = async (req: Request, res: Response): Promise<Response> => {
  const {queueId} = req.params;
  
    const  data = await SubQueues.findAll({
      where:{queueId : queueId }
    });
    
    

  return res.json({data});
}

export const store = async (req: Request, res: Response): Promise<Response> => {
    const data = req.body;
    const {queueId} = req.params;

    
    
     await SubQueues.destroy({
      where:{queueId : queueId }
    });

    try {
      data.map((value:any) => {
       SubQueues.create(value)
    })
    } catch (error) {
      SubQueues.create(data)
    }
    

    return res.json({});
   
};


