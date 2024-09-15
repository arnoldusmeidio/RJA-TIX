import Link from "next/link"

export default function NotAuthorized() {

    return (
        <main className="bg-primary flex h-screen text-center">
            {/* Not Found */}
            <div className="w-full max-w-xl m-auto p-5 md:p-0">
                <h3 className="text-2xl md:text-5xl font-inter font-semibold text-third mb-7"><span className="text-third">Sorry, but you don’t have an authorized.</span></h3>
                <Link href="/"><button className="btn btn-sm bg-third text-xl text-primary hover:bg-primary hover:text-third transition-all ease-in-out">Contact Admin</button></Link>
            </div>
            {/* Not Found */}
        </main>
    )
}