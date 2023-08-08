class SimpleResponse {
    public error?: boolean;
    public msg?: string;
    public payload?: any;

    constructor(error:boolean ,msg:string ,payload:any ) {
        this.error = error;
        this.msg = msg;
        this.payload = payload
    }
}

export default SimpleResponse;