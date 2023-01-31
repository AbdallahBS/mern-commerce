export default function Header(){
    const handlePrint = ()=>{
        window.print()
      }
    return (
        <>
            <header className="flex flex-col items-center justify-center mb-5">
          <div>
            <h2 className="font-bold tracking-wide text-4xl">Invoicer</h2>
          </div>
          <div>
            <ul className="flex items-center justify-between flex-wrap">
              <li>
                <button onClick={handlePrint} classNam="btn btn-print">Print</button>
              </li>
              <li><button classNam="btn btn-download">Download</button></li>
              <li><button classNam="btn btn-send">Send</button></li>
            </ul>
          </div>
        </header>
        </>
    )
}