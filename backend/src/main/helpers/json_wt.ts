import jwt, { JwtPayload } from "jsonwebtoken";

const generateToken =  (uid: number , correo: string) => {
    return new Promise( (resolve, reject) => {
        const payload = { uid , correo };
        jwt.sign( payload , process.env.SECRETORPRIVATEKEY || '*M3d1c4D3l4Ciud4d*',{
            expiresIn: '10h',
            // expiresIn: '120s'

        },( error, token) => {
            if (error) {
                console.log( error );
                reject('no se pudo generar jwt');
            }else{
                resolve(token);
            }
        });
    })
}


const getTokenData = (token: any): any => {
    // console.log("entre");
    let data = null;
    jwt.verify(token, process.env.SECRETORPRIVATEKEY || '', (err, decoded) => {
        if (err) {
            console.log('Token expirado', err);
        } else {
            data = decoded || '';
        }
    });
    return data;
}

export {
    generateToken,
    getTokenData
};
