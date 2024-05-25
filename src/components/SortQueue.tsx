'use client'
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Checkout } from "@/checkout";

export default function SortQueue() {
  const [checkout] = useState(new Checkout());
  const [queues] = useState(checkout.getQueue())
  const [time, setTime] = useState<number>(0)
  const [input, setInput] = useState(0);
  const [firstRowFull, setfirstRowFull]  = useState(false)
  // const [col, setCol] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      // if(time%5 == 0){
      //   checkout.decreaseCart()
      // }
      checkout.decreaseCart()
      
      setTime(time + 1)
    }, 1000);

    return () => clearTimeout(timer);
  })

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = parseInt(event.target.value);
    setInput(value)
  }

  function setQueue(event: FormEvent) {
    event.preventDefault();
    let update = false;
    
    if(input > 0){
      if(!firstRowFull){
        for(let row = 0; row < queues.length && !update; row++){
          if(queues[row][0] === 0 || !queues[row][0]){
            checkout.updateItem(row, 0, input)
            update = true
            break
          }else if(row === 4){
            console.log('first row full')
            setfirstRowFull(true)
            updateQueue(input)
          }
        }
      }else{
        console.log('in else')
        updateQueue(input)
      }
    }
  }

  function sumValue(): number[] {
    // let sum = 0
    let sumArray: number[] = [0, 0, 0, 0, 0]

    for(let i=0; i < queues.length; i++){
      // console.log('rap'+ i)
      for(let j=0; j<= queues[i].length; j++){
        if(queues[i][j] != null){
          // console.log(queues[i][j])
          sumArray[i] += queues[i][j]
        }
      }
    }
    // console.log(sumArray)
    return sumArray
  }

  function getRow(): number {
    let array: number[] = sumValue()
    let minValue = array[0]
    let minPosition = 0

    for(let i=0; i < array.length; i++){
      if(array[i] < minValue){
        minValue = array[i]
        minPosition = i
      }
    }
    // console.log(minPosition)
    return minPosition;
  }

  function updateQueue(value: number): void {
    const row = getRow()
    // let col = 0
    if(firstRowFull){
      for(let i=1; i <= queues[row].length; i++){
        if(queues[row][i] === 0 || queues[row][i] == null){
          console.log(i)
          checkout.updateItem(row, i, value)
          break
        }
      }
    }
      
    // console.log("row:" + row +", col: "+col)
    
  }
  

  return (
    <>
    <div className="flex flex-col justify-center p-10">
      <h1 className="text-center">input number </h1>
      <form className="text-center" onSubmit={setQueue}>
       
          <input className="bg-black" type="number" value={input} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    
      
      <p className="text-center">Time: {time}</p>
      <table className="table-fixed w-full">
        <tbody>
          {queues.map((col, rowIndex) => {
            return (
              <tr key={rowIndex}>
              
              {col.map((cart, cartIndex) => {
                return(
                  <td key={cartIndex}>{cart}</td>
                )
                
              })}
              
              </tr>
            )
            
          })}
        </tbody>
      </table>
        
        
      {/* <button onClick={sumValue}>sumvalue</button><br />
      <button onClick={getRow}>getRow</button><br /> */}
      {/* <button onClick={getCol}>getCol</button> */}
    </div>
    </>
  );
}
