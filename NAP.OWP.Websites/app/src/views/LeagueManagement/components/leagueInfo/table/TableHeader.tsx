const TableHeader = () => {
  return (
    <>
      <tr>
        <th rowSpan={2} className='blue-header'>
          #
        </th>
        <th rowSpan={2} className='blue-header'>
          League Group
        </th>
        <th rowSpan={2} className='blue-header'>
          League
        </th>
        <th rowSpan={1} colSpan={4} className='grey-header'>
          Condition
        </th>
        <th rowSpan={2} className='blue-header'>
          Spread HDP(%)
        </th>
        <th rowSpan={2} className='blue-header'>
          Spread OU(%)
        </th>
        <th rowSpan={1} colSpan={2} className='light-blue-header'>
          MB Weekday
        </th>
        <th rowSpan={1} colSpan={2} className='pink-header'>
          MB Weekend
        </th>
        <th rowSpan={1} colSpan={2} className='blue-header'>
          Display in Mis match file
        </th>
        <th rowSpan={2} className='grey-header'>
          Comment
        </th>
      </tr>
      <tr>
        <th rowSpan={1} className='blue-header'>
          TV
        </th>
        <th rowSpan={1} className='blue-header'>
          Round
        </th>
        <th rowSpan={1} className='blue-header'>
          League Division
        </th>
        <th rowSpan={1} className='blue-header'>
          Remark
        </th>
        <th rowSpan={1} className='light-blue-header'>
          HDP(K)
        </th>
        <th rowSpan={1} className='light-blue-header'>
          NO.HDP
        </th>
        <th rowSpan={1} className='pink-header'>
          HDP
        </th>
        <th rowSpan={1} className='pink-header'>
          NO.HDP
        </th>
        <th rowSpan={1} className='blue-header'>
          LST Note (Show under League)
        </th>
        <th rowSpan={1} className='blue-header'>
          Remark 2 (Show under match)
        </th>
      </tr>
    </>
  );
};
export default TableHeader;
