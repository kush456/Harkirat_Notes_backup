//now all the pages that have the route /signin or signin/..something
//will have this 20 perc off banner at the top
export default function({children} : {
    children: React.ReactNode; 
}){

    return(
        <div>
            <div className = "border-b text-center">
                20% off for the next 4 days
            </div>
            {children}
        </div> 
    )
}