/* eslint-disable no-restricted-globals */
import { PassContext } from "../context/passContext"

import { useContext, useState } from "react";

import { useHistory } from 'react-router-dom';
import { motion } from "framer-motion";

export default function LoginPage() {

    const history = useHistory();

    const { setPass } = useContext(PassContext)

    const [newPass, setNewPass] = useState("")

    return <motion.div transition={{duration: .25}} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="page">
        <h1>Alpakat2's virtuelle Kekse</h1>
        <h2></h2>
        <div className="row">
            <input placeholder="Name der Keksdose" value={newPass} onChange={(e)=>{setNewPass(e.target.value)}} type="password" id="" />
            <button type="submit" onClick={() => { setPass(newPass); history.push("/cookie") }}>Gib mir Kekse!</button>
        </div>
    </motion.div>
}
