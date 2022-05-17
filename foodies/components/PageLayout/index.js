import React from 'react'

function SingleWindow({className, size, component, title, des, center, titleColor=""}) {

    var sizeStyle

    switch(size) {
        case 'sm':
            sizeStyle = "250px"
            break;
        case 'md':
            sizeStyle = "400px"
            break;
        case 'lg':
            sizeStyle = "450px"
            break;
        case 'xl':
            sizeStyle = "500px"
            break;
        case '2xl':
            sizeStyle = "550px"
            break;
        default:
            sizeStyle = "350px" 
    }

    return (
        <section className={`${className?className:""} flex flex-col w-full min-h-[${sizeStyle}] px-4 lg:h-[${sizeStyle}] h-fit`}>
            {title && <h1 className={`text-[30px] ${titleColor} ${center ? "text-center" : "text-left"} my-0`}>{title}</h1>}
            {des && <div className={`text-lg mt-3 ${titleColor}/70 ${center ? "text-center" : "text-left"}`}>{des}</div>}
            {component}
        </section>
    )
}

function DualWindow({className, size, component1, component2, title1, title2, des1, des2, center, alcenter}) {

    var sizeStyle

    switch(size) {
        case 'sm':
            sizeStyle = "350px"
            break;
        case 'md':
            sizeStyle = "400px"
            break;
        case 'lg':
            sizeStyle = "450px"
            break;
        case 'xl':
            sizeStyle = "500px"
            break;
        case '2xl':
            sizeStyle = "550px"
            break;
        default:
            sizeStyle = "350px" 
    }

    return (
        <section className={`${className?className:""} w-full lg:h-[${sizeStyle}] h-fit min-h-[${sizeStyle}] lg:flex-row flex-col flex px-4`}>
            <div className={`${alcenter?"justify-center":""} lg:w-1/2 h-full flex flex-col`}>
                {title1 && <h1 className={`my-0 text-[40px] text-green-700 ${center ? "text-center" : "text-left"}`}>{title1}</h1>}
                {des1 && <div className={`text-md text-gray-600 ${center ? "text-center" : "text-left"} mt-2`}>{des1}</div>}
                {component1}
            </div>
            <div className={`${alcenter?"justify-center":""} lg:w-1/2 h-full flex flex-col`}>
                {title2 && <h1 className={`my-0 text-[40px] text-green-700 ${center ? "text-center" : "text-left"}`}>{title2}</h1>}
                {des2 && <div className={`text-md text-gray-600 ${center ? "text-center" : "text-left"} mt-2`}>{des2}</div>}
                {component2}
            </div>
        </section>
    )
}

function GridWindow({className="", gridStyle="", title, des, center, titleColor="", component}) {
    return (
        <section className={`${className} w-full h-fit flex flex-col`}>
            {title && <h1 className={`text-[30px] ${titleColor} ${center ? "text-center" : "text-left"} my-0`}>{title}</h1>}
            {des && <div className={`text-lg mt-3 ${titleColor}/70 ${center ? "text-center" : "text-left"}`}>{des}</div>}
            <div className={`${gridStyle} grid`}>
                {component}
            </div>
        </section>
    )
}

function Page({children}) {
  return (
    <main className='grow w-full top-[80px] h-fit'>
        <div className="max-w-[1200px] mx-auto w-full h-full py-5">
            {children}
        </div>
    </main>
  )
}

Page.SingleWindow = SingleWindow
Page.DualWindow = DualWindow
Page.GridWindow = GridWindow

export default Page