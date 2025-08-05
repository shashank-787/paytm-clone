import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
export function SendMoney() {
    const [searchParams, setSearchParams] = useSearchParams();
    const firstName = searchParams.get('name');
    const id = searchParams.get('id');
    const [amount, setAmount] = useState(0);
    return (
        <div className="flex justify-center h-screen w-full bg-bermuda">
            <div className="flex items-center ">
                <div className="w-80 bg-white rounded-lg flex flex-col items-center p-5">
                    <div className='text-3xl font-bold mb-4'>Send Money</div>
                        <div className='flex items-baseline w-full gap-4 py-1'>
                        <div className="text-2xl flex justify-center items-center h-10 w-10 font-bold rounded-full bg-gray-300">
                            {firstName[0]}
                        </div>
                        <div className='text-2xl font-semibold'>{firstName}</div>
                    </div>
                    <div className='w-full text-sm py-2'>
                        <div className='font-bold mb-2'>Amount (in Rs)</div>
                        <input onChange={e => setAmount(e.target.value)} name='' type="number" placeholder='Enter Amount' className='w-full border-1 py-1 px-2 focus:outline-none border-gray-200 rounded-sm' />
                    </div>
                    <button onClick={(e) => {
                        axios.post('http://localhost:3000/api/v1/account/transfer',
                            {
                                to : id,
                                amount
                            }, {
                                headers : {
                                    Authorization : "Bearer " + localStorage.getItem("token")
                                }
                            }
                        ).then(res => console.log(res))
                        .catch(err => console.log(err))
                    }} className="mt-3 w-full text-sm font-medium px-5 h-9 rounded-lg flex items-center justify-center cursor-pointer text-white bg-green-500 hover:bg-green-600">
                        Initiate Transfer
                    </button>
                </div>
            </div>
        </div>
    )
}