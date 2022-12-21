import React, { ReactNode } from 'react'
import Head from 'next/head'

type Props = {
    children?: ReactNode
    title?: string
}

const PlainLayout = ({ children, title = 'This is the default title' }: Props) => (
    <div className="font-rubik">
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>

        <div className="bg-white text-fuscous-gray-600">
            {children}
        </div>

    </div>
)

export default PlainLayout 