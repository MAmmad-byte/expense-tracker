import React from 'react'

interface Props{
    title: string
    description?: string
    category: string
    expense: number
}

const ExpenseListItem = ({title, description,  expense}:Props) => {
  return (
    <li className="pb-3 sm:pb-4">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                {title}
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                {description}
              </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              Rs {expense}
            </div>
          </div>
        </li>
  )
}

export default ExpenseListItem