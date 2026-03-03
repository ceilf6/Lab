import { useEffect, useRef, useState, useCallback } from 'react'

interface UseFetchOptions<P> {
    manual?: boolean
    defaultParams?: P
    deps?: any[]
}

interface UseFetchResult<T, P> {
    data: T | null
    loading: boolean
    error: any
    run: (params?: P) => Promise<T | undefined>
    refresh: () => Promise<T | undefined>
}

export function useFetch<T = any, P = any>(
    service: (params: P, signal?: AbortSignal) => Promise<T>,
    options: UseFetchOptions<P> = {}
): UseFetchResult<T, P> {
    const { manual = false, defaultParams, deps = [] } = options

    const [data, setData] = useState < T | null > (null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState < any > (null)

    const paramsRef = useRef < P | undefined > (defaultParams)
    const abortRef = useRef < AbortController | null > (null)
    const fetchIdRef = useRef(0)

    const run = useCallback(
        async (params?: P) => {
            const currentId = ++fetchIdRef.current

            paramsRef.current = params ?? paramsRef.current

            if (!paramsRef.current) return

            // 取消上一次请求
            abortRef.current?.abort()
            const controller = new AbortController()
            abortRef.current = controller

            setLoading(true)
            setError(null)

            try {
                const result = await service(paramsRef.current, controller.signal)

                // 防止竞态（只处理最后一次请求）
                if (currentId !== fetchIdRef.current) return

                setData(result)
                return result
            } catch (err: any) {
                if (currentId !== fetchIdRef.current) return
                if (err.name !== 'AbortError') {
                    setError(err)
                }
            } finally {
                if (currentId === fetchIdRef.current) {
                    setLoading(false)
                }
            }
        },
        [service]
    )

    const refresh = useCallback(() => {
        return run(paramsRef.current)
    }, [run])

    // 自动加载
    useEffect(() => {
        if (!manual) {
            run(defaultParams)
        }

        return () => {
            abortRef.current?.abort()
        }
    }, deps)

    return {
        data,
        loading,
        error,
        run,
        refresh,
    }
}