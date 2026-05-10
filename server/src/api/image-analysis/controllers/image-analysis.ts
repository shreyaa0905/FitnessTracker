import {Context} from "koa"
import { analyzeImage } from "../services/gemini"

export default{
    async analyze(ctyx:Context){
        const file= ctyx.request.files?.image as any;
        if(!file) return ctyx.badRequest('No image uploaded')
            const filePath= file.filepath;

        try {
            const result= await analyzeImage(filePath)
            return ctyx.send({success:true,result})
            
        } catch (error) {
            ctyx.internalServerError("Analysis failed",
                {error: error.message}
            )
            
        }
    }
}