import {Link} from "react-router-dom";


export const MachinePage = () => {

    return (
        <>
            <section className="py-3 py-md-4 py-xl-5 bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="h4">Analisis</h1>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0 fs-7">
                                    <li className="breadcrumb-item">
                                        <Link className="link-primary text-decoration-none" to="/home">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item">Operacion</li>
                                    <li className="breadcrumb-item active" aria-current="page">Maquinas</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>

        </>

    )

}