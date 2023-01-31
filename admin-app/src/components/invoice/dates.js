import React from 'react';
import Name from '../../containers/olders/index'

/**
* @author
* @function Dates
**/

export const Dates = (props) => {
  return(
    <>
     <article className="my-5 flex items-end justify-end">
          <ul>
            <li>
                Invoice Number: <span>{Name}</span>
            </li>
            <li>
                Invoice Date:
            </li>
            <li>
                Due Date
            </li>
          </ul>
        </article>
    </>
   )

 }
 export default Dates;