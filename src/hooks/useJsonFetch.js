import { useState, useEffect } from "react";

export default function useJsonFetch(url, fetchOpts, ...opts) {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [hasError, setError] = useState(null)

    const deps = opts.deps ? opts.deps : []

    useEffect(() => {
        (async function json () {
            try {
                const response = await fetch(url, {...fetchOpts}, );
                if (response.status >= 200 && response.status < 300) {
                    const data = await response.json();
                    setData(data)
                } else {
                  throw new Error(response.statusText)
                }
            } catch (e) {
                setError(e)
            } finally {
                setLoading(false)
            }
        })()
    }, deps)
    return [data, isLoading, hasError] 
}