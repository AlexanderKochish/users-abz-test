export class AppService{
    async serviceFetch(uri, query = '', met = 'GET'){
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}${uri}${query}`,{
            method: met
        })

        if(!res.ok){
            throw new Error("Bad request")
        }

        const data = await res.json()

        return data
    }
}