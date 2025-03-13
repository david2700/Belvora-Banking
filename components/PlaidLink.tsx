"use client"

import React, { useCallback, useState, useEffect } from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation';
import {PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink} from "react-plaid-link";
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions';

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
                <Button onClick={() => open()} >
                    Connect bank
                </Button>
            ): (
                <Button onClick={() => open()}>
                    Connect bank
                </Button>
            )
        }
    </>
  )
}

export default PlaidLink