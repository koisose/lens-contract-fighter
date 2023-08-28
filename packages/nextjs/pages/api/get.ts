import {Deta} from 'deta'; // import Deta
const deta = Deta(process.env.DETA);
const db = deta.Base('lensfighter');
export default async(req, res) => {
    try{
        
        const response = await db.fetch();
        res.status(200).json(response)
    }catch(e){
      
        res.status(200).json([])
    }
    
}