"use client"

import React, { useCallback, useState, useEffect } from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation';
import {PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink} from "react-plaid-link";
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions';
import Image from 'next/image';

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
    const router = useRouter();
    const [token, setToken] = useState("")

    useEffect(() => {
        const getLinkToken = async () => {
            const data = await createLinkToken(user);

            setToken(data?.linkToken);
        }

        getLinkToken();
    }, [user])

    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
        await exchangePublicToken({
            publicToken: public_token,
            user,
        });

        router.push("/");
    }, [user, router])

    const config: PlaidLinkOptions = {
        token, 
        onSuccess
    }

    const { open, ready } = usePlaidLink(config);
  return (
    <>
        {
            variant === "primary" ? (
                <Button
                    onClick={() => open()}
                    disabled={!ready}
                    className="plaidlink-primary"
                >
                    Connect bank
                </Button>
            ): variant === "ghost" ? (
                <Button onClick={() => open()} className='plaidlink-ghost'>
                    <Image 
                        src="/icons/connect-bank.svg"
                        alt="connect bank"
                        width={24}
                        height={24}
                    />
                    <p className='hidden xl:block text-[16px] font-semibold
                    text-black-2'>Connect bank</p>
                </Button>
            ): variant === "add-bank" ? (
                <Button onClick={() => open()} className='flex gap-1 bg-white hover:bg-white/90 shadow-none'>
                    <Image 
                        src="/icons/plus.svg"
                        width={20}
                        height={20}
                        alt='add bank'
                    />
                    <h2 className='text-14 font-semibold text-gray-700'>Add Bank</h2>
                </Button>
            ): (
                <Button onClick={() => open()} className='plaidlink-default'>
                    <Image 
                        src="/icons/connect-bank.svg"
                        alt="connect bank"
                        width={24}
                        height={24}
                    />
                    <p className='text-[16px] font-semibold
                    text-black-2'>Connect bank</p>
                </Button>
            )
        }
    </>
  )
}

export default PlaidLink