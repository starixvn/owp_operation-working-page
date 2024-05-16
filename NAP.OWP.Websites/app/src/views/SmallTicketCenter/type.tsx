export type TParentsResponse={
  id: number,
  name: string
}


export type TTicketTypeOptions = {
    value: string;
     title: string;
      key: string;
       showTitle: string;
  };

export type TChildrenResponse={
  parentId: number,
  subTypeId: number,
  subTypeName: string
}
export type TTicketTypeResponse={
  parents:Array<TParentsResponse>,
  children:Array<TChildrenResponse>
}

export type TUpdateFilterParams={
  key: 'keyword'|'ticketTypeId'|'ticketStatuses',
  value: string
}

export type TUpdateFilterTimeRange={
  key: 'fromDateFilter'|'toDateFilter',
  value: Date
}
