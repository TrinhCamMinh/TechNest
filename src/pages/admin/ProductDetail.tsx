import SampleImage from '@/mocks/image-dog-sample.jpg';

const ProductDetail = () => {
    return (
        <div className="h-full grid grid-cols-5 gap-4">
            <div className="col-span-3 flex flex-col gap-4">
                <header className="text-center uppercase">
                    <p className='text-2xl font-bold'>Product - <span className='underline underline-offset-4 text-blue-600'>520H0659</span></p>
                </header>
                <main>
                    <div className="flex flex-col gap-4">
                        <label className="input input-bordered flex items-center gap-2">
                            Name
                            <input type="text" className="grow" placeholder="Daisy" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Email
                            <input type="text" className="grow" placeholder="daisy@site.com" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Name
                            <input type="text" className="grow" placeholder="Daisy" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Email
                            <input type="text" className="grow" placeholder="daisy@site.com" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Name
                            <input type="text" className="grow" placeholder="Daisy" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Email
                            <input type="text" className="grow" placeholder="daisy@site.com" />
                        </label>
                    </div>
                </main>
            </div>
            <aside className="col-span-2 self-center">
                <img src={SampleImage} alt="product image" className='h-3/6 w-full'/>
            </aside>
        </div>
    )
}

export default ProductDetail;