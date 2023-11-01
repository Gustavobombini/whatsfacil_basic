import SubQueues from "../../models/SubQueues";

const ListSubQueuesService = async (queueId:number): Promise<SubQueues[]> => {
  const subQueues =  await SubQueues.findAll({
    where:{queueId : queueId }
  });

  return subQueues;
};

export default ListSubQueuesService;
