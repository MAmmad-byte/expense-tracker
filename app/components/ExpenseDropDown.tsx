import React from 'react'
import { StatsList } from '../page'
import moment from 'moment'
interface Props{
    statsList:StatsList[]
}
const ExpenseDropDown = ({statsList}:Props) => {
  return (
    <div>

<form className="max-w-sm mx-auto">
  <select id="countries" className="bg-gray-50 border px-1 border-gray-300 text-gray-900 text-xs rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full  ">
    {/* <option selected>Choose a country</option> */}
    {statsList.map(list=>(
    <option value={list.date} key={list.date} >{moment(list.date, "MMM-YY").format("MMMM-YYYY")}</option>
    ))}
    {/* <option value="FR">France</option>
    <option value="DE">Germany</option>
    <option value="CA">Canada</option> */}
  </select>
</form>


    </div>
  )
}

export default ExpenseDropDown
