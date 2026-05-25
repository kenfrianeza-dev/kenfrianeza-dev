'use client'

import React, { FC } from "react";

const Header: FC<React.PropsWithChildren<{}>> = () => {
    return (
        <nav className="fixed flex w-full justify-between items-center px-6 md:px-10 xl:px-12 py-6 top-0 left-0 z-50">
            <p className="text-2xl">Header</p>
        </nav>
    )
}

export default Header;