export interface HttpResponse{
    status : number
    body : string | null
}

export const ok = (body : any) : HttpResponse => {
    return {
        status : 200,
        body : body
    }
}

export const created = (body : any) : HttpResponse => {
    return {
        status : 201,
        body : body
    }
}

export const badRequest = (body : any) : HttpResponse => {
    return {
        status: 400,
        body : body
    }
    
}

export const notFound = (body : any) : HttpResponse => {
    return {
        status : 404,
        body : body
    }

}

export const notContent = () : HttpResponse => {
    return {
        status: 204,
        body : null
    }

}