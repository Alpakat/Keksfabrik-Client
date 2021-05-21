import { useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { useContext, useEffect, useState } from "react";
import { PassContext } from "../context/passContext"

import { AnimatePresence, motion } from "framer-motion"

import keks from "../keks.png"

export interface UseQueryInterface {
    isLoading: boolean;
    error: any;
    data: any;
}

export default function LoginPage() {

    const [currentState, setCurrentState] = useState(0)

    const { pass, queryClient } = useContext(PassContext)

    const { isLoading, data }: UseQueryInterface = useQuery('cookieData', () =>
        fetch(`https://URLTOSERVER/getcookie?pass=${pass}&initial=false`).then(res =>
            res.text()
        ).catch(() => "timeout"), { cacheTime: 0, refetchInterval: 1000 })

    useEffect(() => {

        // let interval = setTimeout(() => { poll() }, 2000)

        // let interval = setTimeout(() => { }, 9999);

        // function poll() {

        //     interval = setTimeout(() => {
        //         fetch(`http://192.168.1.10:9253/getcookie?pass=${pass}&initial=false`, { method: "get" }).then((res) => {
        //             res.text().then((text) => {
        //                 queryClient?.setQueryData("cookieData", data => (text))
        //                 setIsError(false)
        //                 poll()
        //             })
        //         }).catch(() => {
        //             queryClient?.setQueryData("cookieData", data => ("timeout"))
        //             poll()
        //         })
        //     }, 2000) //Polling

        // }

        // return () => {
        //     clearTimeout(interval)
        // }

    }, [pass, queryClient])

    useEffect(() => {
        fetch(`https://URLTOSERVER/getcookie?pass=${pass}&initial=true`)
    }, [pass])

    function eatCokie() {

        fetch(`https://URLTOSERVER/eatcookie?pass=${pass}`, { method: "get" }).then((res) => {
            res.text().then((text) => {
                queryClient?.setQueryData("cookieData", data => (text))
            })
        }).catch(() => {
            queryClient?.setQueryData("cookieData", data => ("timeout"))
        })

    }

    console.log(typeof (data))

    useEffect(() => {

        let newCurrentState = 0

        if (!isLoading || data === undefined) {
            newCurrentState = 0
        }

        if (data === "timeout") {
            newCurrentState = 1
        }

        else if (data === "0") {
            newCurrentState = 2
        }

        else if (data === "wrongpass") {
            newCurrentState = 4
        }

        else if (data !== undefined) {
            newCurrentState = 3
        }

        setCurrentState(newCurrentState)

    }, [isLoading, data])

    let keekse = []

    for (let i = 0; i < data; i++) {

        keekse.push(<motion.div transition={{ duration: .25 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, width: "0px", scale: 0.9 }} key={i}>
            <img className="keks" src={keks} />
        </motion.div>)

    }

    return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="page">
        <AnimatePresence exitBeforeEnter initial={true}>
            {currentState === 0 && <motion.div transition={{ duration: .25 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="0"><h1>Wumpus schaut nach Keksen.</h1></motion.div>}
            {currentState === 1 && <motion.div transition={{ duration: .25 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="1"><h1>Wumpus kommt nicht in die Keksfabrik. (aka keine Verbindungs zum Server)</h1></motion.div>}
            {currentState === 2 && <motion.div transition={{ duration: .25 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="2"><h1>Eine leere Keksschachtel bleibt zurück... Wumpus ist traurig.</h1></motion.div>}
            {currentState === 3 && <motion.div transition={{ duration: .25 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="3">
                <h1>Alpakat2 hat dir {data} Keks(e) geschenkt. Hier /ist er/sind sie:</h1>
                <div className="row">
                    <AnimatePresence>
                        {keekse}
                    </AnimatePresence>
                </div>
                <div className="button" onClick={eatCokie}>Essen</div>
            </motion.div>}
            {currentState === 4 && <motion.div transition={{ duration: .25 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="4"><h1>Wumpus hat keine Keksschachtel "{pass}" gefunden. ;(</h1></motion.div>}
        </AnimatePresence>
    </motion.div>
}