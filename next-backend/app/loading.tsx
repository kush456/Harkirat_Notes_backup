//provided out of the box just like layout and page.tsx
//loading.tsx is our loader file for anything
export default function(){
    return(
        <div className="flex flex-col justify-center h-screen">
            <div className="flex justify-center">
                <div className="border p-8 rounded">
                    loading...
                </div>
            </div>
        </div>
    )
}