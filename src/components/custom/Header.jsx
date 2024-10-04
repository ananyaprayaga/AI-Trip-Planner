import React from 'react'
import {Button} from "@/components/ui/button"

function Header() {
    return (
        <div  className='p-2 shadow-sm flex justify-between items-center px-5'>
            <img src='/logo.svg' />
        <div>
            <Button>Sign In</Button>
        </div>
        </div>
    )
    }


export default Header