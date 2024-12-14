
//wrangler basically is cloudfare's CLI
//we dont have express here in the dependency, here we dont write app.get etc
//someone else wrote all this for us we just write a simple function, and for routingwe will see
//but we dont own the http logic here someone else does 
//eg we dont write app.listen, hame ni worry krna uske liye 

//in short we just need to write the http logic
//creating the http server on top is handled by wrangler
export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		return Response.json({
			message : "You did not send a request"
		});
	},
};

//we dont use express here so the code is a bit shit
//libraries hai, they make our life easier 

//IGNORE rest of the files in this week-11/my-app, i thought ek new folder banta jo banna chahiye tha inside week-11
//kuch bt hogayi so different folder all together banaunga 
